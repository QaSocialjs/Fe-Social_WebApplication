import { ApiError } from "@lib/services/ErrorApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { clsx, type ClassValue } from "clsx";
import { Ok, ResultAsync } from "neverthrow";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface Language {
  value?: string;
}
export function getStringGender(gender: number): string {
  if (gender === 1) return "Male";
  return "Famale";
}

export function TypeOfResponse<T extends Object>(e: PayloadAction<T>) {
  const result = e as unknown as Ok<
    Response,
    void | Error | ApiError | ResultAsync<never, ApiError>
  >;
  return result;
}
