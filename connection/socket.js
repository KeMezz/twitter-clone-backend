import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const createSocket = (server) => {
  const socket = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      optionsSuccessStatus: 200,
      credentials: true,
    },
  });

  socket.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }
    jwt.verify(token, config.jwt.secretKey, (error) => {
      if (error) {
        return next(new Error("Authentication error"));
      }
      next();
    });
  });

  socket.on("connection", () => {
    console.log("Socket client connected!");
  });

  return socket;
};

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = createSocket(server);
  }
}
export function getSocket() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket;
}
