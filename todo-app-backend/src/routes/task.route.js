import { Router } from "express";
import controller from "../controllers/task.controller.js";
import task from "../middleware/task.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", auth.authenticateToken, task.createTask, controller.createTask);
router.get("/", auth.authenticateToken, controller.getTasks);
router.get("/:userId/:taskId", auth.authenticateToken, controller.getTaskById);
router.put(
  "/:userId/:taskId/status",
  auth.authenticateToken,
  controller.updateTaskStatus,
);
router.delete(
  "/:userId/:taskId",
  auth.authenticateToken,
  controller.deleteTask,
);

export default router;