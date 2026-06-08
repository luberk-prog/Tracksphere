import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes";

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

export default router;
