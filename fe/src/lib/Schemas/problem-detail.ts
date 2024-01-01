import { object, string, number } from "yup";

export const problemDetailSchema = object({
  type: string(),
  title: string(),
  status: number(),
  detail: string().optional(),
  traceId: string().optional(),
  errors: object({
    message: string().required(),
    XErrorType: string(),
  }).optional(),
});
