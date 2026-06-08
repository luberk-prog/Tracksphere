import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";

      const status =
        message.includes("already") ? 409 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";

      res.status(401).json({
        success: false,
        message,
      });
    }
  }
}

export const authController = new AuthController();
