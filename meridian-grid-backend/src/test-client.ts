import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "./constants";
const SERVER_URL = "http://localhost:3000";
const machineId = "e696e91a-e19a-497f-a4f8-332b59e50483";

const socket = io(SERVER_URL);
socket.on(SOCKET_EVENTS.CONNECT, () => {
  console.log(`Connected to server with socket ID: ${socket.id}`);
  socket.emit("subscribeToMachine", machineId);
});

socket.on(SOCKET_EVENTS.MACHINE_DATA, (data) => {
  console.log("Received machine data: ", data);
});

socket.on(SOCKET_EVENTS.DISCONNECT, () => {
  console.log("Client disconnected from the server.");
});
