import { Router } from "express";
import { createOrUpdateProfile, getProfile, listProfiles } from "../controllers/profile.controller.js";
const router = Router();
9
// public create/update (assignment allows open write for candidate)
router.post("/", createOrUpdateProfile);
router.get("/", getProfile); // ?email=
router.get("/list", listProfiles);
export default router;