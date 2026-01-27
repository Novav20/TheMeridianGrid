import { useState, useEffect } from "react";
import "./App.css";
import { getHello } from "./api/client";
import User from "@tmg/shared";

function App() {
  const [message, setMessage] = useState<string>("Connecting to server...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHello();
        setMessage(result.message);
      } catch (error) {
        console.error("Failed to connect:", error);
        setMessage("Server unreachable");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Meridian Grid</h1>
        <div className="server-status">
          <p>Server Status: {message}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
