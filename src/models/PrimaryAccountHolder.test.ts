import { Stop } from "types/Stop";
import { Tap } from "types/Tap";
import { TapType } from "types/TapType";
import { TripStatus } from "types/TripStatus";
import { TripSummary } from "types/TripSummary";
import { PrimaryAccountHolder } from "./PrimaryAccountHolder";

test("Creating a primary account holder with the same taps as in the project spec produce the specified trip summary output", () => {
  const tapOn: Tap = {
    id: 1,
    datetimeUTC: "22-01-2021 13:00:00",
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "Company1",
    busId: "Bus37",
    primaryAccountNumber: 5500005555555559,
  };
  const tapOff: Tap = {
    id: 2,
    datetimeUTC: "22-01-2021 13:05:00",
    tapType: TapType.OFF,
    stopId: Stop.Stop2,
    companyId: "Company1",
    busId: "Bus37",
    primaryAccountNumber: 5500005555555559,
  };

  const primaryAccountHolder = new PrimaryAccountHolder(tapOn.primaryAccountNumber, [
    tapOn,
    tapOff,
  ]);
  const tripSummaries = primaryAccountHolder.GetTripSummaries();
  const expectedTripSummaries: TripSummary[] = [
    {
      started: "22-01-2021 13:00:00",
      finished: "22-01-2021 13:05:00",
      durationSecs: 300,
      fromStopId: Stop.Stop1,
      toStopId: Stop.Stop2,
      chargeAmount: 3.25,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
      status: TripStatus.COMPLETED,
    },
  ];
  expect(tripSummaries).toEqual(expectedTripSummaries);
});

test("Attempting to assign taps to an AccountHolder with a different Primary Account Number throws an exception", () => {
  const tapOn: Tap = {
    id: 1,
    datetimeUTC: "22-01-2021 13:00:00",
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "Company1",
    busId: "Bus37",
    primaryAccountNumber: 5500005555555559,
  };
  const tapOff: Tap = {
    id: 2,
    datetimeUTC: "22-01-2021 13:05:00",
    tapType: TapType.OFF,
    stopId: Stop.Stop2,
    companyId: "Company1",
    busId: "Bus37",
    primaryAccountNumber: 5500005555555558,
  };

  expect(() => {
    new PrimaryAccountHolder(tapOn.primaryAccountNumber, [tapOn, tapOff]);
  }).toThrow();
});
