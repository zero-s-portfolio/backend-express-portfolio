import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", ContactController.create);

router.get("/", authMiddleware, ContactController.getAll);
router.get("/:id", authMiddleware, ContactController.getById);

router.patch("/:id/status", authMiddleware, ContactController.updateStatus);
router.patch("/:id/reply", authMiddleware, ContactController.reply);
router.patch("/:id/star", authMiddleware, ContactController.toggleStar);

router.delete("/:id", authMiddleware, ContactController.delete);

export default router;