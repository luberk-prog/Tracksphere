import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { env } from "../config/env";

export function initializeSocket(httpServer: HttpServer): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Placeholder for future real-time features:
    // - Live location sharing
    // - Real-time notifications
    // - Direct messaging
    // - Activity feed updates
    // - Emergency SOS alerts
  });

  return io;
}
