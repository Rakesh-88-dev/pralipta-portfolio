import express from "express";

import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";

const router = express.Router();

router.get("/", getEducation);

router.post("/", protect, createEducation);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateEducation
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteEducation
);

export default router;