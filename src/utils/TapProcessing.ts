import { PrimaryAccountHolder } from "models/PrimaryAccountHolder";
import { Tap } from "types/Tap";

export const getTripSummariesFromTaps = (taps: Tap[]) => {
  const accountHolders = getAccountHoldersFromTapHistory(taps);
  return accountHolders.flatMap((accountHolder) => {
    return accountHolder.GetTripSummaries();
  });
};

const getAccountHoldersFromTapHistory = (taps: Tap[]) => {
  // get distinct Primary Account Numbers from all the tap data
  const distinctPrimaryAccountNumbers = taps
    .map((tap) => tap.primaryAccountNumber)
    .filter((accountNumber, index, self) => self.indexOf(accountNumber) === index);

  // for each distinct Primary Account Number, create an Primary Account Holder and set their matching taps
  return distinctPrimaryAccountNumbers.map((accountNumber) => {
    const tapsForThisAccountNumber = taps.filter((tap) => {
      return tap.primaryAccountNumber === accountNumber;
    });
    return new PrimaryAccountHolder(accountNumber, tapsForThisAccountNumber);
  });
};
