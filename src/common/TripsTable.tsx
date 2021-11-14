import { FareTable } from "components/styles/FareTable.styled";
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
        <div role="region" aria-labelledby="Caption01" className={styles.scrollableTableContainer}>
          <FareTable>
            <caption id="Caption01">Fare Table</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th colSpan={2}>Trip Start</th>
                <th colSpan={2}>Trip End</th>
                <th>fare</th>
                <th colSpan={3}></th>
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
                  <td>{formatCurrency(trip.chargeAmount)}</td>
                  <td>{trip.status}</td>
                  <td>{trip.busId}</td>
                  <td>{trip.companyId}</td>
                </tr>
              ))}
            </tbody>
          </FareTable>
        </div>
      )}
    </>
  );
};
