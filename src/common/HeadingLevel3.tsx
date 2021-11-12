import React from "react";
import { IconType } from "react-icons";
import styles from "./HeadingLevel3.module.css";
import { useTheme, Theme } from "theming/ThemeContext";

interface Props {
  headingText: string;
  icon?: IconType;
}
export const HeadingLevel3: React.FunctionComponent<Props> = ({ headingText, icon }) => {
  const { theme } = useTheme();
  const Icon = icon;
  return (
    <h3 className={theme === Theme.Unicorn ? styles.subHeaderUnicorn : styles.subHeader}>
      {Icon && <Icon />} {` ${headingText}`}
    </h3>
  );
};
