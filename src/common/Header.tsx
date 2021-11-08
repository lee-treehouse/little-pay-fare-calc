import React from "react";
import styles from "./Header.module.css";
import { FaBusAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <h1 className={styles.mainHeader}>
      <FaBusAlt /> Little Pay
    </h1>
  );
};
