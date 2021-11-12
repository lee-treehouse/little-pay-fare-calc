import React from "react";
import styles from "./Header.module.css";
import { FaBusAlt } from "react-icons/fa";
import { useTheme, Theme } from "theming/ThemeContext";

export const Header = () => {
  const { theme } = useTheme();
  return (
    <>
      <h1 className={theme === Theme.Unicorn ? styles.mainHeaderUnicorn : styles.mainHeader}>
        <FaBusAlt /> brittle<span className={styles.green}>Pay</span>
      </h1>
    </>
  );
};
