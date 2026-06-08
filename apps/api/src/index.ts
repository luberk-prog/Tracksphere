import express from "express";
import cors from "cors";
import { createServer } from "http";
import { env } from "./config/env";
import routes from "./routes";
import { initializeSocket } from "./sockets";

// Initialize Express
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// Start server
httpServer.listen(env.PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║                                          ║
  ║   🌐 TrackSphere API                     ║
  ║   📡 Port: ${String(env.PORT).padEnd(28)}║
  ║   🔧 Mode: ${env.NODE_ENV.padEnd(28)}║
  ║   🔌 Socket.IO: Active                   ║
  ║                                          ║
  ╚══════════════════════════════════════════╝
  `);
});

export { app, httpServer, io };
