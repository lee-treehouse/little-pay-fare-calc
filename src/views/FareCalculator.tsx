import React, { useEffect, useState } from "react";
import styles from "./ViewsCommon.module.css";
import { FaCalculator } from "react-icons/fa";
import { Tap, TapContainer } from "types/Tap";
import { TripSummary } from "types/TripSummary";
import { getTripSummariesFromTaps } from "utils/TapProcessing";
import { HeadingLevel2 } from "common/HeadingLevel2";
import { TripsTable } from "common/TripsTable";

export const FareCalculator = () => {
  const [tapsInput, setTapsInput] = useState<Tap[] | undefined>(undefined);
  const [tripsOutput, setTripsOutput] = useState<TripSummary[] | undefined>(undefined);

  useEffect(() => {
    if (tapsInput) {
      setTripsOutput(getTripSummariesFromTaps(tapsInput));
    }
  }, [tapsInput]);

  const readTapsJSONFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (fileReader.result) {
          // as specified in the readme it is assumed any uploaded file will be a well formed taps.json
          setTapsInput((JSON.parse(fileReader.result as string) as TapContainer).taps);
        }
      };
      if (uploadedFile !== undefined) {
        fileReader.readAsText(uploadedFile);
      }
    }
  };

  return (
    <>
      <HeadingLevel2 icon={FaCalculator} headingText="Fair Fare Calculator" />
      <div className={styles.main}>
        {!tapsInput && <input type="file" onChange={(e) => readTapsJSONFile(e)} />}

        {tripsOutput && (
          <>
            <p>
              {`${tripsOutput.length} ${tripsOutput.length === 1 ? "trip" : "trips"} calculated.`}
            </p>

            <p>
              <a
                href={URL.createObjectURL(
                  new Blob([JSON.stringify({ trips: tripsOutput }, null, 4)], {
                    type: `data:text/json;charset=utf-8`,
                  })
                )}
                download="trips.json"
              >
                Download Calculated Fares in JSON format
              </a>
            </p>

            <button
              onClick={() => {
                // Reset state
                setTripsOutput(undefined);
                setTapsInput(undefined);
              }}
            >
              Start Again
            </button>
            {tripsOutput && <TripsTable tripsOutput={tripsOutput} />}
          </>
        )}
      </div>
    </>
  );
};
