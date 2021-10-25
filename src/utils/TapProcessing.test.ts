import { Stop } from "types/Stop";
import { Tap } from "types/Tap";
import { TapType } from "types/TapType";
import { TripStatus } from "types/TripStatus";
import { TripSummary } from "types/TripSummary";
import { getTripSummariesFromTaps } from "./TapProcessing";

test("Parsing taps with the same properties as the project spec produces the specified trip output", () => {
  const taps: Tap[] = [
    {
      id: 1,
      datetimeUTC: "22-01-2021 13:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop1,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 2,
      datetimeUTC: "22-01-2021 13:05:00",
      tapType: TapType.OFF,
      stopId: Stop.Stop2,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
  ];

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

  const tripSummaries = getTripSummariesFromTaps(taps);

  expect(tripSummaries).toEqual(expectedTripSummaries);
});

test("Parsing taps from two separate travellers with the same properties as the project spec produces the specified trip output", () => {
  const taps: Tap[] = [
    {
      id: 1,
      datetimeUTC: "22-01-2021 13:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop1,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 2,
      datetimeUTC: "22-01-2021 13:05:00",
      tapType: TapType.OFF,
      stopId: Stop.Stop2,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 1,
      datetimeUTC: "22-01-2021 13:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop1,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555558,
    },
    {
      id: 2,
      datetimeUTC: "22-01-2021 13:05:00",
      tapType: TapType.OFF,
      stopId: Stop.Stop2,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555558,
    },
  ];

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
    {
      started: "22-01-2021 13:00:00",
      finished: "22-01-2021 13:05:00",
      durationSecs: 300,
      fromStopId: Stop.Stop1,
      toStopId: Stop.Stop2,
      chargeAmount: 3.25,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555558,
      status: TripStatus.COMPLETED,
    },
  ];

  const tripSummaries = getTripSummariesFromTaps(taps);

  expect(tripSummaries).toEqual(expectedTripSummaries);
});

test("tap on without subsequent tap off is correctly identified as incomplete - not paired with tap off event the following day", () => {
  const taps: Tap[] = [
    {
      id: 1,
      datetimeUTC: "22-01-2021 13:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop2,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 2,
      datetimeUTC: "22-01-2021 13:30:00",
      tapType: TapType.OFF,
      stopId: Stop.Stop3,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 3,
      datetimeUTC: "22-01-2021 16:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop3,
      companyId: "Company1",
      busId: "Bus50",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 4,
      datetimeUTC: "23-01-2021 13:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop2,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 5,
      datetimeUTC: "23-01-2021 13:30:00",
      tapType: TapType.OFF,
      stopId: Stop.Stop3,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 6,
      datetimeUTC: "23-01-2021 16:00:00",
      tapType: TapType.ON,
      stopId: Stop.Stop3,
      companyId: "Company1",
      busId: "Bus50",
      primaryAccountNumber: 5500005555555559,
    },
    {
      id: 7,
      datetimeUTC: "23-01-2021 16:30:00",
      tapType: TapType.OFF,
      stopId: Stop.Stop2,
      companyId: "Company1",
      busId: "Bus50",
      primaryAccountNumber: 5500005555555559,
    },
  ];

  const expectedTripSummaries: TripSummary[] = [
    {
      started: "22-01-2021 13:00:00",
      finished: "22-01-2021 13:30:00",
      durationSecs: 1800,
      fromStopId: Stop.Stop2,
      toStopId: Stop.Stop3,
      chargeAmount: 5.5,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
      status: TripStatus.COMPLETED,
    },
    {
      started: "22-01-2021 16:00:00",
      fromStopId: Stop.Stop3,
      chargeAmount: 7.3,
      companyId: "Company1",
      busId: "Bus50",
      primaryAccountNumber: 5500005555555559,
      status: TripStatus.INCOMPLETE,
    },
    {
      started: "23-01-2021 13:00:00",
      finished: "23-01-2021 13:30:00",
      durationSecs: 1800,
      fromStopId: Stop.Stop2,
      toStopId: Stop.Stop3,
      chargeAmount: 5.5,
      companyId: "Company1",
      busId: "Bus37",
      primaryAccountNumber: 5500005555555559,
      status: TripStatus.COMPLETED,
    },
    {
      started: "23-01-2021 16:00:00",
      finished: "23-01-2021 16:30:00",
      durationSecs: 1800,
      fromStopId: Stop.Stop3,
      toStopId: Stop.Stop2,
      chargeAmount: 5.5,
      companyId: "Company1",
      busId: "Bus50",
      primaryAccountNumber: 5500005555555559,
      status: TripStatus.COMPLETED,
    },
  ];

  const tripSummaries = getTripSummariesFromTaps(taps);

  expect(tripSummaries).toEqual(expectedTripSummaries);
});

test("Attempting to process only tap offs will produce an empty trip summary", () => {
  const tapOff: Tap = {
    id: 2,
    datetimeUTC: "22-01-2021 13:05:00",
    tapType: TapType.OFF,
    stopId: Stop.Stop2,
    companyId: "Company1",
    busId: "Bus37",
    primaryAccountNumber: 5500005555555559,
  };

  const tripSummaries = getTripSummariesFromTaps([tapOff]);
  expect(tripSummaries).toEqual([]);
});

test("Attempting to process an empty tap array will produce an empty trip summary", () => {
  const tripSummaries = getTripSummariesFromTaps([]);
  expect(tripSummaries).toEqual([]);
});
