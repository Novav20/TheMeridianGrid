import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.types";

export const useColorMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useColorMode must be used inside ThemeProvider");
  }
  return context;
};
