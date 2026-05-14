import { Router } from "express";
import {
  destroySkill,
  getSkillDetail,
  getSkills,
  storeSkill,
  updateSkill,
} from "../controllers/skill.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadImage } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getSkills);
router.get("/:id", getSkillDetail);

router.post("/", authMiddleware, uploadImage.single("image"), storeSkill);
router.put("/:id", authMiddleware, uploadImage.single("image"), updateSkill);
router.delete("/:id", authMiddleware, destroySkill);

export default router;