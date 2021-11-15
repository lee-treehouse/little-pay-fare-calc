import styles from "./ViewsCommon.module.css";
import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { HeadingLevel2 } from "common/HeadingLevel2";
import { getStopDisplayName, Stop } from "types/Stop";
import { TapType } from "types/TapType";
import { Trip } from "models/Trip";
import { formatCurrency } from "utils/Formatters";

export const PriceMyTrip = () => {
  const [tapOnStop, setTapOnStop] = useState<Stop | undefined>(Stop.Stop1);
  const [tapOffStop, setTapOffStop] = useState<Stop | undefined | "">(undefined);
  const [result, setResult] = useState<number | undefined>(undefined);
  const availableStops = Object.values(Stop);

  const calculateTripCost = () => {
    const tapOn = tapOnStop
      ? {
          datetimeUTC: "22-01-2021 13:00:00",
          id: 1,
          tapType: TapType.ON,
          stopId: tapOnStop,
          companyId: "dummy",
          busId: "dummy",
          primaryAccountNumber: 0,
        }
      : undefined;

    if (tapOn) {
      const trip =
        tapOffStop && tapOffStop.length > 0
          ? new Trip(tapOn, "22-01-2021 13:05:00", tapOffStop)
          : new Trip(tapOn);
      const tripSummary = trip.getTripSummary();
      setResult(tripSummary.chargeAmount);
    }
  };

  return (
    <>
      <HeadingLevel2 icon={FaDollarSign} headingText="Price My Trip" />
      <div className={styles.main}>
        <p>
          <label htmlFor="startingStopSelector">
            Starting stop
            <br />
            <select
              name="startingStopSelector"
              id="startingStopSelector"
              onBlur={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setTapOnStop(event.target.value as Stop);
              }}
            >
              {availableStops.map((stop) => {
                return (
                  <option key={stop} value={stop}>
                    {getStopDisplayName(stop)}
                  </option>
                );
              })}
            </select>
          </label>
        </p>
        <p>
          <label htmlFor="endingStopSelector">
            Finishing stop
            <br />
            <select
              name="endingStopSelector"
              id="endingStopSelector"
              onBlur={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setTapOffStop(event.target.value as Stop);
              }}
            >
              <option value="">Did not tap off</option>
              {availableStops.map((stop) => {
                return (
                  <option key={stop} value={stop}>
                    {getStopDisplayName(stop)}
                  </option>
                );
              })}
            </select>
          </label>
        </p>
        <button onClick={calculateTripCost}>Calculate</button>
        {result === 0 && <p>Free</p>}
        {result && result !== 0 && <p>Fee: {formatCurrency(result)}</p>}
      </div>
    </>
  );
};
