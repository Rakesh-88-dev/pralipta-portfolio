import express from "express";

import {
  login,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";
import { authRateLimiter } from "../middleware/rateLimit.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { validateLogin } from "../utils/validation.js";

const router = express.Router();

router.post(
  "/login",
  authRateLimiter,
  validate(validateLogin),
  login
);

router.get(
  "/me",
  protect,
  getCurrentAdmin
);

export default router;