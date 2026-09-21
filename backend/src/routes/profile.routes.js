import express from "express";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProfile);

router.post("/", protect, createProfile);

router.put("/", protect, updateProfile);

export default router;