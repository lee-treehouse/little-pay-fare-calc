import React from "react";
import styles from "./ViewsCommon.module.css";
import { FaHome } from "react-icons/fa";
import { HeadingLevel2 } from "common/HeadingLevel2";

const Home = () => {
  return (
    <>
      <HeadingLevel2 icon={FaHome} headingText="Home" />
      <div className={styles.main}>
        <label htmlFor="promo">
          <input id="promo" type="checkbox"></input>
          Checking my accessibility linting with a checkbox label?
        </label>
      </div>
    </>
  );
};

export default Home;
