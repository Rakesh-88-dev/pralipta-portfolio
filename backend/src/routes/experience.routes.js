import express from "express";

import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";

const router = express.Router();

router.get("/", getExperience);

router.post("/", protect, createExperience);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateExperience
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteExperience
);

export default router;