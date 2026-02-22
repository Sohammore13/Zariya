import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this is for storig online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // ── Voice Call Signaling ────────────────────────────────────────────────────

  // Caller → Server: forward to callee
  socket.on("call:initiate", ({ to, offer, callerName, callerPic }) => {
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call:incoming", {
        callerId: userId,
        callerName,
        callerPic,
        offer,
      });
    }
  });

  // Callee → Server: forward answer to caller
  socket.on("call:accept", ({ to, answer }) => {
    const callerSocketId = getReceiverSocketId(to);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call:accepted", { answer });
    }
  });

  // Callee → Server: tell caller the call was rejected
  socket.on("call:reject", ({ to }) => {
    const callerSocketId = getReceiverSocketId(to);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call:rejected");
    }
  });

  // Either side → Server: hang up
  socket.on("call:end", ({ to }) => {
    const otherSocketId = getReceiverSocketId(to);
    if (otherSocketId) {
      io.to(otherSocketId).emit("call:ended");
    }
  });

  // ICE candidate relay (both directions)
  socket.on("webrtc:ice-candidate", ({ to, candidate }) => {
    const targetSocketId = getReceiverSocketId(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("webrtc:ice-candidate", { candidate });
    }
  });
});

export { io, app, server };
