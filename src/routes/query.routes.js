import { Router } from "express";
import { search, projectsBySkill, topSkills, health } from "../controllers/query.controller.js";
const router = Router();
router.get("/search", search);
router.get("/projects", projectsBySkill);
router.get("/skills/top", topSkills);
router.get("/health", health);
export default router;