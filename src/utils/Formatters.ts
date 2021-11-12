import { format } from "date-fns";
import { getDate } from "./Parsers";

export const formatDate = (stringUTC: string) => {
  const date = getDate(stringUTC);
  return format(date, "yyyy-MM-dd");
};

export const formatTime = (stringUTC: string) => {
  const date = getDate(stringUTC);
  return format(date, "HH:mm");
};

export const formatCurrency = (value: number) => {
  return `$${value.toFixed(2)}`;
};
