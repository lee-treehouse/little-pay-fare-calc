import { getDate } from "./Parsers";

test("Ambiguous Date String with dd-mm as specified in project instructions is successfully parsed.", () => {
  const dateString = "22-01-2021 13:00:00";
  const parsedDate = getDate(dateString);
  const dateToMatch = new Date(2021, 0, 22, 13, 0, 0);
  expect(parsedDate).toEqual(dateToMatch);
});
