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

  async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const user = await authService.getCurrentUser(req.user.userId);
      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    // JWT logout is typically handled by the client by deleting the token.
    // We can add logic here if we implement a token blacklist.
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}

export const authController = new AuthController();
