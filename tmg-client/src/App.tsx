import { Box, Button, Typography } from "@mui/material";
import { useColorMode } from "./hooks/useColorMode";
import "./App.css";

function App() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h1">The Meridian Grid</Typography>
      <Typography sx={{ mb: 2 }}>Current Mode: {mode}</Typography>
      <Button variant="contained" onClick={toggleColorMode}>
        Toggle Theme
      </Button>
    </Box>
  );
}

export default App;
