import { Stop } from "./Stop";
import { TapType } from "./TapType";

export type Tap = {
  readonly id: number;
  readonly datetimeUTC: string;
  readonly tapType: TapType;
  readonly stopId: Stop;
  readonly companyId: string;
  readonly busId: string;
  readonly primaryAccountNumber: number;
};

export type TapContainer = {
  readonly taps: Tap[];
};
