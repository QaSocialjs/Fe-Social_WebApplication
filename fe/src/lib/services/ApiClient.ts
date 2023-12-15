import { fromPromise, ok, errAsync } from "neverthrow";
import { ApiError } from "./ErrorApi";

interface ApiClientOption {
  baseUrl: string;
  version: string;
}

function trim(input: string, char: string) {
  let start = 0;
  let end = input.length;
  while (input[start] === char) ++start;
  while (input[--end] === char);
  if (end < start) end = start - 1;
  return input.substring(start, end + 1);
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?:
    | Record<number | string, any>
    | any[]
    | FormData
    | Blob
    | BufferSource
    | URLSearchParams
    | string;
}
export class ApiClient {
  private static _instance: ApiClient | undefined = undefined;
  private static _options: ApiClientOption | undefined = undefined;

  protected constructor(private readonly _option: ApiClientOption) {}
  public static get instance() {
    if (!ApiClient._instance) {
      if (!ApiClient._options) {
        throw new ReferenceError(
          "Failed to initialize ApiClient. An option must be provied using `ApiClient.use(Option)` first"
        );
      }
      ApiClient._instance = new ApiClient(ApiClient._options);
    }
    return ApiClient._instance;
  }
  public static use(options: ApiClientOption) {
    ApiClient._options = options;
  }

  protected fetch(
    input: string | URL,
    { headers, ...options }: RequestOptions
  ) {
    const url = typeof input === "string" ? input : input.pathname;
    const record: Record<string, string> = ApiClient.makeHeader(headers);
    if (options.body) {
      record["Content-type"] ??=
        options.body instanceof FormData || options.body instanceof ArrayBuffer
          ? "multipart/form-data"
          : "application/json";
    }
    const [path, query] = url.split("?", 2);
    // console.log(
    //   this._option.baseUrl +
    //     "/" +
    //     this._option.version +
    //     "/" +
    //     trim(path, "/").split("/").join("/") +
    //     "?" +
    //     query
    // );
    return fromPromise(
      fetch(
        this._option.baseUrl +
          "/" +
          this._option.version +
          "/" +
          trim(path, "/").split("/").join("/"),
        options
          ? {
              ...options,
              headers: record,
              body:
                options?.body instanceof FormData ||
                options?.body instanceof ArrayBuffer
                  ? options.body
                  : JSON.stringify(options?.body),
            }
          : undefined
      ),
      (e) => (e instanceof Error ? e : new Error("Unexpected error"))
    ).andThen((x) =>
      x.ok
        ? ok(x)
        : errAsync(x.json()).mapErr(async (x) => ApiError.from(await x))
    );
  }

  public get(input: string | URL, options?: RequestOptions) {
    return this.fetch(input, {
      ...options,
      method: "GET",
    });
  }
  public post(input: string | URL, options?: RequestOptions) {
    return this.fetch(input, {
      ...options,
      method: "POST",
    });
  }
  private static makeHeader(headers?: HeadersInit): Record<string, string> {
    if (!headers) return {};
    return Array.isArray(headers)
      ? Object.fromEntries(headers)
      : headers instanceof Headers
      ? Object.fromEntries(headers.entries())
      : headers;
  }
}
