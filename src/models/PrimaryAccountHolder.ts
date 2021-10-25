import { Tap } from "types/Tap";
import { TapType } from "types/TapType";
import { getDate } from "utils/Parsers";
import { Trip } from "./Trip";

export class PrimaryAccountHolder {
  readonly accountNumber: number;
  readonly tapHistory: Tap[];

  constructor(primaryAccountNumber: number, tapHistory: Tap[]) {
    // validate supplied taps match the supplied account number
    const incorrectlyAttributedTaps = tapHistory.find(
      (tap) => tap.primaryAccountNumber !== primaryAccountNumber
    );
    if (incorrectlyAttributedTaps) {
      throw new Error(
        "tapHistory parameter contains one or more taps with Primary Account Numbers not matching the one supplied in this object's constructor"
      );
    }

    this.accountNumber = primaryAccountNumber;
    this.tapHistory = tapHistory;
  }

  private getTripsFromTapHistory = () => {
    // divide taps into tap ons and tap offs
    const tapOns = this.tapHistory.filter((tap) => {
      return tap.tapType === TapType.ON;
    });
    const tapOffs = this.tapHistory.filter((tap) => {
      return tap.tapType === TapType.OFF;
    });

    // ensure tap ons and tap offs are sorted chronologically
    tapOns.sort((a, b) => {
      return getDate(a.datetimeUTC).getTime() < getDate(b.datetimeUTC).getTime() ? -1 : 1;
    });
    tapOffs.sort((a, b) => {
      return getDate(a.datetimeUTC).getTime() < getDate(b.datetimeUTC).getTime() ? -1 : 0;
    });

    // iterate through the tap ons and match them up with a tap off event where there is one available
    // (ie before the next tap on event - no concurrent trips are handled)
    // note - any tap off records found that do not have a matching tap on record will be ignored.
    return tapOns.map((currentTapOn, i) => {
      const nextTapOn = i < tapOns.length - 1 ? tapOns[i + 1] : undefined;

      const tapOffEventWithinPossibleTripTimeFrame = tapOffs.find((tapOff) => {
        if (nextTapOn) {
          return (
            tapOff.datetimeUTC > currentTapOn.datetimeUTC &&
            tapOff.datetimeUTC < nextTapOn?.datetimeUTC &&
            currentTapOn.busId === tapOff.busId &&
            currentTapOn.companyId === tapOff.companyId
          );
        } else {
          return (
            tapOff.datetimeUTC > currentTapOn.datetimeUTC &&
            currentTapOn.busId === tapOff.busId &&
            currentTapOn.companyId === tapOff.companyId
          );
        }
      });

      if (!tapOffEventWithinPossibleTripTimeFrame) {
        return new Trip(currentTapOn);
      } else {
        return new Trip(
          currentTapOn,
          tapOffEventWithinPossibleTripTimeFrame.datetimeUTC,
          tapOffEventWithinPossibleTripTimeFrame.stopId
        );
      }
    });
  };

  public GetTripSummaries() {
    const trips = this.getTripsFromTapHistory();
    return trips.map((trip) => trip.getTripSummary());
  }
}
