import express from "express";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";

const router = express.Router();

router.get("/", getSkills);

router.post("/", protect, createSkill);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateSkill
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteSkill
);

export default router;