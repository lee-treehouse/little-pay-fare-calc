import { Stop } from "types/Stop";
import { Tap } from "types/Tap";
import { TapType } from "types/TapType";
import { TripStatus } from "types/TripStatus";
import { Trip } from "./Trip";

test("A 5 minute trip is calculated as having 300 seconds duration", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop2;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const durationSeconds = tripSummary.durationSecs;
  expect(durationSeconds).toBe(300);
});

test("If a trip has no tap off the duration seconds is undefined", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const trip = new Trip(TapOn);
  const tripSummary = trip.getTripSummary();
  const durationSeconds = tripSummary.durationSecs;
  expect(durationSeconds).toBe(undefined);
});

test("Travel from stop 1 to stop 3 costs 7.30", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop3;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(7.3);
});

test("Travel from stop 3 to stop 1 costs 7.30", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop3,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop1;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(7.3);
});

test("Travel from stop 1 to stop 2 costs 3.25", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop2;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(3.25);
});

test("Travel from stop 2 to stop 1 costs 3.25", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop2,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop1;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(3.25);
});

test("Travel from stop 2 to stop 3 costs 5.50", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop2,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop3;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(5.5);
});

test("Travel from stop 3 to stop 2 costs 5.50", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop3,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop2;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(5.5);
});

test("Cancelled trip at stop 1 is free", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop1;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(0);
});

test("Incomplete trip starting at stop 1 costs 7.30", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const trip = new Trip(TapOn);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(7.3);
});

test("Incomplete trip starting at stop 3 costs 7.30", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop3,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const trip = new Trip(TapOn);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(7.3);
});

test("Incomplete trip starting at stop 2 costs 5.50", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop2,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const trip = new Trip(TapOn);
  const tripSummary = trip.getTripSummary();
  const chargeAmount = tripSummary.chargeAmount;
  expect(chargeAmount).toBe(5.5);
});

test("Tap on without tap off has status INCOMPLETE", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const trip = new Trip(TapOn);
  const tripSummary = trip.getTripSummary();
  const status = tripSummary.status;
  expect(status).toBe(TripStatus.INCOMPLETE);
});

test("Trip with same tap on and tap off stop has status CANCELLED", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop1;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const tripStatus = tripSummary.status;
  expect(tripStatus).toBe(TripStatus.CANCELLED);
});

test("Trip with different tap on and tap off stop has status COMPLETED", () => {
  const TapOn: Tap = {
    datetimeUTC: "22-01-2021 13:00:00",
    id: 1,
    tapType: TapType.ON,
    stopId: Stop.Stop1,
    companyId: "",
    busId: "",
    primaryAccountNumber: 0,
  };
  const tapOffStopId = Stop.Stop2;
  const tapOffDatetimeUTC = "22-01-2021 13:05:00";
  const trip = new Trip(TapOn, tapOffDatetimeUTC, tapOffStopId);
  const tripSummary = trip.getTripSummary();
  const tripStatus = tripSummary.status;
  expect(tripStatus).toBe(TripStatus.COMPLETED);
});
