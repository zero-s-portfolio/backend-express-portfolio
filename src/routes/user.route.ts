import { Router } from "express";
import {
  destroyUser,
  getUserDetail,
  getUsers,
  storeUser,
  updateUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getUsers);
router.get("/:id", getUserDetail);
router.post("/", storeUser);
router.put("/:id", updateUser);
router.delete("/:id", destroyUser);

export default router;