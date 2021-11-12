import React from "react";
import { IconType } from "react-icons";
import styles from "./HeadingLevel2.module.css";
import { Trans } from "react-i18next";
import { useTheme, Theme } from "theming/ThemeContext";

interface Props {
  headingText: string;
  icon: IconType;
  localizedHeadingKey?: string;
}
export const HeadingLevel2: React.FunctionComponent<Props> = ({
  headingText,
  icon,
  localizedHeadingKey,
}) => {
  const { theme } = useTheme();
  const Icon = icon;
  return (
    <h2 className={theme === Theme.Unicorn ? styles.subHeaderUnicorn : styles.subHeader}>
      {<Icon />}
      {localizedHeadingKey && (
        <Trans i18nKey={localizedHeadingKey}>Looking for {localizedHeadingKey}</Trans>
      )}
      {!localizedHeadingKey && " " && headingText}
    </h2>
  );
};
