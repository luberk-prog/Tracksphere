import { Router, Request, Response, NextFunction } from "express";
import { authController } from "../controllers/auth.controller";
import { validate, authenticate } from "../middlewares";
import { registerSchema, loginSchema } from "../validators";

const router = Router();

router.post("/register", validate(registerSchema), (req: Request, res: Response) => {
  authController.register(req, res);
});

router.post("/login", validate(loginSchema), (req: Request, res: Response) => {
  authController.login(req, res);
});

router.get("/me", authenticate, (req: Request, res: Response) => {
  authController.me(req, res);
});

router.post("/logout", (req: Request, res: Response) => {
  authController.logout(req, res);
});

export default router;
