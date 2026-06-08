import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
