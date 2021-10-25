import { Stop } from "./Stop";
import { TripStatus } from "./TripStatus";

export type TripSummary = {
  started: string;
  finished?: string;
  durationSecs?: number;
  fromStopId: Stop;
  toStopId?: Stop;
  chargeAmount: number;
  companyId: string;
  busId: string;
  primaryAccountNumber: number;
  status: TripStatus;
};
