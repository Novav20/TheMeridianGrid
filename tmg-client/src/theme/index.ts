import { createTheme, type ThemeOptions } from "@mui/material/styles";

// Common settings
const baseOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      "Inter", 
      "-apple-system", 
      "BlinkMacSystemFont", 
      '"Segoe UI"', 
      "Roboto", 
      '"Helvetica Neue"', 
      "Arial", 
      "sans-serif"
    ].join(","),
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    h4: { fontSize: "1.25rem", fontWeight: 600 },
    h5: { fontSize: "1.1rem", fontWeight: 600 },
    h6: { fontSize: "1rem", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Disable default overlay in dark mode
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // Blue 600
      light: "#60a5fa",
      dark: "#1e40af",
    },
    secondary: {
      main: "#475569", // Slate 600
    },
    background: {
      default: "#f8fafc", // Slate 50
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#64748b", // Slate 500
    },
  },
});

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6", // Blue 500
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#94a3b8", // Slate 400
    },
    background: {
      default: "#0f172a", // Slate 900
      paper: "#1e293b", // Slate 800
    },
    text: {
      primary: "#f1f5f9", // Slate 100
      secondary: "#94a3b8", // Slate 400
    },
  },
});
