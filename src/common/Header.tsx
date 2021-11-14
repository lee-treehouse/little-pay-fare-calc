import React from "react";
import styles from "./Header.module.css";
import { FaBusAlt } from "react-icons/fa";
import { useTheme, Theme } from "theming/ThemeContext";
import { Link } from "react-router-dom";
import { StyledHeader } from "components/styles/Header.styled";

export const Header = () => {
  const { theme } = useTheme();
  return (
    <StyledHeader>
      <h1 className={theme === Theme.Unicorn ? styles.mainHeaderUnicorn : styles.mainHeader}>
        <FaBusAlt />{" "}
        <Link to="/">
          brittle<span className={styles.green}>Pay</span>
        </Link>
      </h1>
    </StyledHeader>
  );
};
