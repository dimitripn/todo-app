import { Router } from "express";
import controller from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", auth.register, controller.register);
router.post("/login", auth.login, controller.login);
router.post(
  "/change-password",
  auth.authenticateToken,
  auth.changePassword,
  controller.changePassword,
);

export default router;
