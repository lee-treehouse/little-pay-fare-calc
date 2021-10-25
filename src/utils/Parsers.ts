import { parse } from "date-fns";

export const getDate = (stringUTC: string) => {
  return parse(stringUTC, "dd-MM-yyyy HH:mm:ss", new Date());
};
