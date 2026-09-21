import express from "express";

import {
  getSettings,
  createSettings,
  updateSettings,
} from "../controllers/settings.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSettings);

router.post("/", protect, createSettings);

router.put("/", protect, updateSettings);

export default router;