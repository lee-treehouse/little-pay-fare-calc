import React, { FunctionComponent } from "react";
import { TripSummary } from "types/TripSummary";
import { formatCurrency, formatDate, formatTime } from "utils/Formatters";
import styles from "./TripsTable.module.css";
interface Props {
  tripsOutput: TripSummary[];
}

export const TripsTable: FunctionComponent<Props> = ({ tripsOutput }) => {
  return (
    <>
      {tripsOutput && tripsOutput.length > 0 && (
        <table className={styles.fareTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th colSpan={2}>Trip Start</th>
              <th colSpan={2}>Trip End</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {tripsOutput.map((trip, counter) => (
              <tr key={counter}>
                <td>{formatDate(trip.started)}</td>
                <td>{formatTime(trip.started)}</td>
                <td>{trip.fromStopId}</td>
                <td>{trip.finished ? formatTime(trip.finished) : " - "}</td>
                <td>{trip.toStopId ? trip.toStopId : " - "}</td>
                <td>{trip.status}</td>
                <td>{formatCurrency(trip.chargeAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
