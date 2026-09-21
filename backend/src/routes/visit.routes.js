import express from "express";
import {
  recordVisit,
  getVisitStats,
} from "../controllers/visit.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Public — portfolio visitors use this
router.post("/", recordVisit);

// Protected — admin dashboard only
router.get("/stats", protect, getVisitStats);

export default router;