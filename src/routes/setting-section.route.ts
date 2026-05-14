import { Router } from "express";
import {
  destroySettingSection,
  getSettingSectionDetailbyKey,
  getSettingSections,
  storeSettingSection,
  updateSettingSection,
} from "../controllers/setting-section.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadImage } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getSettingSections);
router.get("/:key", getSettingSectionDetailbyKey);

router.post("/", authMiddleware, uploadImage.single("icon"), storeSettingSection);
router.put("/:id", authMiddleware, uploadImage.single("icon"), updateSettingSection);
router.delete("/:id", authMiddleware, destroySettingSection);

export default router;