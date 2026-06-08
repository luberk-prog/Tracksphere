import { Request, Response } from "express";
import { socialService } from "../services/social.service";

export class SocialController {
  async follow(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const { id: followingId } = req.params;
      const follow = await socialService.followUser(req.user.userId, followingId);

      res.status(200).json({
        success: true,
        message: "Followed successfully",
        data: { follow },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({
        success: false,
        message,
      });
    }
  }

  async unfollow(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const { id: followingId } = req.params;
      await socialService.unfollowUser(req.user.userId, followingId);

      res.status(200).json({
        success: true,
        message: "Unfollowed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getFollowers(req: Request, res: Response): Promise<void> {
    try {
      const { id: userId } = req.params;
      const followers = await socialService.getFollowers(userId);
      res.status(200).json({
        success: true,
        data: { followers },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getFollowing(req: Request, res: Response): Promise<void> {
    try {
      const { id: userId } = req.params;
      const following = await socialService.getFollowing(userId);
      res.status(200).json({
        success: true,
        data: { following },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const socialController = new SocialController();
