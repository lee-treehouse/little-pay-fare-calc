import { createContext, useContext } from "react";

export enum Theme {
  Unicorn = "Unicorn",
  Light = "Light",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Light,
  setTheme: (theme) => console.warn("no theme provider"),
});
export const useTheme = () => useContext(ThemeContext);
