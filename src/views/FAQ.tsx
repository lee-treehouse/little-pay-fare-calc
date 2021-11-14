import styles from "./ViewsCommon.module.css";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { HeadingLevel2 } from "common/HeadingLevel2";
import { HeadingLevel3 } from "common/HeadingLevel3";
import { formatCurrency } from "utils/Formatters";
import { FareTable } from "components/styles/FareTable.styled";

export const FAQ = () => {
  return (
    <>
      <HeadingLevel2 icon={FaQuestionCircle} headingText="FAQ" />
      <div className={styles.main}>
        <HeadingLevel3 headingText="Fees & Charges" />
        <p>
          Here is some explanatory text to accompany the table of fees and charges. If you change
          your mind about a trip (tap on, then immediately tap off) no fees will apply.
        </p>
        <FareTable>
          <thead>
            <tr>
              <th>Trip Start</th>
              <th>Trip End</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stop 1</td>
              <td>Stop 2</td>
              <td>{formatCurrency(3.25)}</td>
            </tr>
            <tr>
              <td>Stop 1</td>
              <td>Stop 3</td>
              <td>{formatCurrency(7.3)}</td>
            </tr>
            <tr>
              <td>Stop 1</td>
              <td>-</td>
              <td>{formatCurrency(7.3)}</td>
            </tr>
            <tr>
              <td>Stop 2</td>
              <td>Stop 1</td>
              <td>{formatCurrency(3.25)}</td>
            </tr>
            <tr>
              <td>Stop 2</td>
              <td>Stop 3</td>
              <td>{formatCurrency(5.5)}</td>
            </tr>
            <tr>
              <td>Stop 2</td>
              <td>-</td>
              <td>{formatCurrency(5.5)}</td>
            </tr>
            <tr>
              <td>Stop 3</td>
              <td>Stop 1</td>
              <td>{formatCurrency(7.3)}</td>
            </tr>
            <tr>
              <td>Stop 3</td>
              <td>Stop 2</td>
              <td>{formatCurrency(5.5)}</td>
            </tr>
            <tr>
              <td>Stop 3</td>
              <td>-</td>
              <td>{formatCurrency(7.3)}</td>
            </tr>
          </tbody>
        </FareTable>
        <HeadingLevel3 headingText="A what question?" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
        <HeadingLevel3 headingText="A why question?" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
      </div>
    </>
  );
};
