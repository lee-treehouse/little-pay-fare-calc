import { Stop } from "types/Stop";
import { Tap } from "types/Tap";
import { TripStatus } from "types/TripStatus";
import { TripSummary } from "types/TripSummary";
import { getDate } from "utils/Parsers";

export class Trip {
  private tapOn: Tap;
  private tapOffDateTimeUTC?: string;
  private tapOffStopId?: Stop;

  constructor(tapOn: Tap, tapOffDatetimeUTC?: string, tapOffStopId?: Stop) {
    this.tapOn = tapOn;
    this.tapOffDateTimeUTC = tapOffDatetimeUTC;
    this.tapOffStopId = tapOffStopId;
  }

  getTripSummary(): TripSummary {
    return {
      started: this.tapOn.datetimeUTC,
      finished: this.tapOffDateTimeUTC,
      durationSecs: this.tapOffDateTimeUTC ? this.getDurationSeconds() : undefined,
      fromStopId: this.tapOn.stopId,
      toStopId: this.tapOffStopId,
      chargeAmount: this.calculateChargeAmount(),
      companyId: this.tapOn.companyId,
      busId: this.tapOn.busId,
      primaryAccountNumber: this.tapOn.primaryAccountNumber,
      status: this.getStatus(),
    };
  }

  getDurationSeconds = () => {
    if (!this.tapOffDateTimeUTC) return undefined;
    const tapOnSecsSinceEpoch = getDate(this.tapOn.datetimeUTC).getTime() / 1000;
    const tapOffSecsSinceEpoch = getDate(this.tapOffDateTimeUTC).getTime() / 1000;
    return tapOffSecsSinceEpoch - tapOnSecsSinceEpoch;
  };

  calculateChargeAmount = () => {
    const tripBetweenStop1AndStop2Charge = 3.25;
    const tripBetweenStop2AndStop3Charge = 5.5;
    const tripBetweenStop1AndStop3Charge = 7.3;
    const cancelledTripCharge = 0;

    // Cancelled trip
    if (this.tapOffStopId && this.tapOn.stopId === this.tapOffStopId) {
      return cancelledTripCharge;
    }

    // Incomplete trip
    if (!this.tapOffStopId) {
      if (this.tapOn.stopId === Stop.Stop1 || this.tapOn.stopId === Stop.Stop3) {
        return tripBetweenStop1AndStop3Charge;
      }
      return Math.max(tripBetweenStop1AndStop2Charge, tripBetweenStop2AndStop3Charge);
    }

    // Complete trip
    if (
      (this.tapOn.stopId === Stop.Stop1 && this.tapOffStopId === Stop.Stop3) ||
      (this.tapOn.stopId === Stop.Stop3 && this.tapOffStopId === Stop.Stop1)
    )
      return tripBetweenStop1AndStop3Charge;

    if (
      (this.tapOn.stopId === Stop.Stop2 && this.tapOffStopId === Stop.Stop3) ||
      (this.tapOn.stopId === Stop.Stop3 && this.tapOffStopId === Stop.Stop2)
    )
      return tripBetweenStop2AndStop3Charge;

    return tripBetweenStop1AndStop2Charge;
  };

  getStatus = () => {
    if (!this.tapOffStopId) return TripStatus.INCOMPLETE;
    if (this.tapOffStopId && this.tapOn.stopId === this.tapOffStopId) return TripStatus.CANCELLED;

    return TripStatus.COMPLETED;
  };
}
