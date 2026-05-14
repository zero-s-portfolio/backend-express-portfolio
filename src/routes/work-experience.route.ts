import { Router } from "express";
import {
  destroyWorkExperience,
  getWorkExperienceDetail,
  getWorkExperiences,
  storeWorkExperience,
  updateWorkExperience,
} from "../controllers/work-experience.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getWorkExperiences);
router.get("/:id", getWorkExperienceDetail);

router.post("/", authMiddleware, storeWorkExperience);
router.put("/:id", authMiddleware, updateWorkExperience);
router.delete("/:id", authMiddleware, destroyWorkExperience);

export default router;