import { object, string, number, array } from "yup";

export const problemDetailSchema = object({
  type: string(),
  title: string(),
  status: number(),
  detail: string().optional(),
  traceId: string().optional(),
  errors: object({
    message: string().required(),
  }).optional(),
});
