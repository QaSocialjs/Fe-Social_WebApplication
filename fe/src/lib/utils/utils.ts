import { clsx, type ClassValue } from "clsx";
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
