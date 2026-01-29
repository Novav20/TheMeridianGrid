import { createContext } from "react";

export type ColorMode = "light" | "dark";

export interface ThemeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
