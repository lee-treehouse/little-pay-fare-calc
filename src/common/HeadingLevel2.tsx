import React from "react";
import { IconType } from "react-icons";
import styles from "./HeadingLevel2.module.css";
import { useTheme, Theme } from "theming/ThemeContext";

interface Props {
  headingText: string;
  icon: IconType;
}
export const HeadingLevel2: React.FunctionComponent<Props> = ({ headingText, icon }) => {
  const { theme } = useTheme();
  const Icon = icon;
  return (
    <h2 className={theme === Theme.Unicorn ? styles.subHeaderUnicorn : styles.subHeader}>
      {<Icon />} {` ${headingText}`}
    </h2>
  );
};
