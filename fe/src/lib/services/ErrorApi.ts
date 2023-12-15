import { problemDetailSchema } from "@lib/Schemas/problem-detail";
import { InferType } from "yup";
export class ApiError extends Error {
  private constructor(
    private readonly _details: InferType<typeof problemDetailSchema>
  ) {
    super();
  }

  public get details() {
    return this._details;
  }

  public static async from(detail: unknown) {
    const data = await problemDetailSchema.validate(detail);
    return new ApiError(data);
  }
}
