import { format, formatDistance, formatRelative, subDays } from "date-fns";

export function formatDate(date: string) {
  return format(date, "yyyy-MM-dd");
}
