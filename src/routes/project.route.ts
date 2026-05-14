import { Router } from "express";
import {
  destroyProject,
  getProjectDetail,
  getProjects,
  storeProject,
  updateProject,
} from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadImage } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectDetail);

router.post(
  "/",
  authMiddleware,
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
  ]),
  storeProject
);

router.put(
  "/:id",
  authMiddleware,
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
  ]),
  updateProject
);

router.delete("/:id", authMiddleware, destroyProject);

export default router;