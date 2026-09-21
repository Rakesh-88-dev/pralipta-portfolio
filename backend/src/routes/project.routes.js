import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";

const router = express.Router();

router.get("/", getProjects);

router.get(
  "/:id",
  validateObjectId,
  getProject
);

router.post("/", protect, createProject);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateProject
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteProject
);

export default router;