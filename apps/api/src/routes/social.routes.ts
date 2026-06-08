import { Router } from "express";
import { socialController } from "../controllers/social.controller";
import { authenticate } from "../middlewares";

const router = Router();

router.post("/:id/follow", authenticate, (req, res) => {
  socialController.follow(req, res);
});

router.delete("/:id/follow", authenticate, (req, res) => {
  socialController.unfollow(req, res);
});

router.get("/:id/followers", (req, res) => {
  socialController.getFollowers(req, res);
});

router.get("/:id/following", (req, res) => {
  socialController.getFollowing(req, res);
});

export default router;
