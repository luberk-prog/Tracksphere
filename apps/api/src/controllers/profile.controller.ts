import { Request, Response } from "express";
import { profileService } from "../services/profile.service";

export class ProfileController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const profile = await profileService.getProfile(req.user.userId);
      res.status(200).json({
        success: true,
        data: { profile },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const profile = await profileService.updateProfile(req.user.userId, req.body);
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: { profile },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const profileController = new ProfileController();
