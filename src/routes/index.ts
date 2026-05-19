import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import skillRoute from "./skill.route";
import workExperienceRoute from "./work-experience.route";
import projectRoute from "./project.route";
import settingSectionRoute from "./setting-section.route";
import contactRoute from "./contact.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/skills", skillRoute);
router.use("/work-experiences", workExperienceRoute);
router.use("/projects", projectRoute);
router.use("/setting-sections", settingSectionRoute);
router.use("/contact", contactRoute);

export default router;