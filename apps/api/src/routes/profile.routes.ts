import { Router } from "express";
import { profileController } from "../controllers/profile.controller";
import { authenticate, validate } from "../middlewares";
import { profileUpdateSchema } from "@tracksphere/validation";

const router = Router();

router.get("/", authenticate, (req, res) => {
  profileController.getProfile(req, res);
});

router.patch("/", authenticate, validate(profileUpdateSchema), (req, res) => {
  profileController.updateProfile(req, res);
});

export default router;
