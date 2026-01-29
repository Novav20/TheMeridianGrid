import { useState, useMemo, useEffect, type ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeContext, type ColorMode } from "./ThemeContext.types";
import { lightTheme, darkTheme } from "../theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize state from localStorage or default to 'dark' (industrial apps usually prefer dark)
  const [mode, setMode] = useState<ColorMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as ColorMode) || "dark";
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  // Update the MUI theme when mode changes
  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  const contextValue = useMemo(() => ({
    mode,
    toggleColorMode,
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kicksstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
