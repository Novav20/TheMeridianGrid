import * as dotenv from "dotenv";
import * as path from "path";
import express, { type Request, type Response } from "express";
import { Server } from "socket.io";
import http from "http";
import { SimulationService } from "./services/simulation.service";
import { SOCKET_EVENTS } from "./constants";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meridian Grid</title>
    <style>
      body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; }
      h1 { font-size: 4rem; color: #007bff; }
    </style>
  </head>
  <body>
    <h1>Hello to The Meridian Grid Project!</h1>

    <!-- ADD THESE TWO SCRIPT BLOCKS -->
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    <script>
      const socket = io("http://localhost:3000");

      socket.on("connect", () => {
        console.log("Browser connected with ID:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Browser disconnected.");
      });
    </script>
    
  </body>
  </html>
`);
});

const httpServer = http.createServer(app);

const allowedOrigin = process.env.CORS_ORIGIN;
if (!allowedOrigin) {
  throw new Error("CORS_ORIGIN is not defined in the environment variables.");
}

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigin, // Origin of React App
    methods: ["GET", "POST"],
  },
});

const simulationService = new SimulationService(io);
simulationService.startAllSimulations();

io.on("connection", (socket) => {
  // This runs for every new client that conects
  console.log("A user connected");
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log("User disconnected.");
  });
  socket.on(SOCKET_EVENTS.SUBSCRIBE_TO_MACHINE, (machineId: string) => {
    socket.join(machineId);
    console.log(`Socket ${socket.id} subscribed to room: ${machineId}`);
  });
});

httpServer.listen(port, () => {
  console.log("Server could be running v:");
});
