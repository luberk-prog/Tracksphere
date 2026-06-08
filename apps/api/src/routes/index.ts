import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes";
import profileRoutes from "./profile.routes";
import socialRoutes from "./social.routes";

const router = Router();

// Health check
router.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "TrackSphere API Running",
  });
});

// API v1 routes
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/profile", profileRoutes);
router.use("/api/v1/users", socialRoutes);

export default router;
