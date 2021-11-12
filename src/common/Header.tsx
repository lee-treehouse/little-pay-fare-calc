import React from "react";
import styles from "./Header.module.css";
import { FaBusAlt } from "react-icons/fa";
import { useTheme, Theme } from "theming/ThemeContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { theme } = useTheme();
  return (
    <>
      <h1 className={theme === Theme.Unicorn ? styles.mainHeaderUnicorn : styles.mainHeader}>
        <Link to="/">
          <FaBusAlt /> brittle<span className={styles.green}>Pay</span>
        </Link>
      </h1>
    </>
  );
};
