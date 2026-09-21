import express from "express";

import {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";
import {
  contactRateLimiter,
} from "../middleware/rateLimit.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { validateMessage } from "../utils/validation.js";

const router = express.Router();

router.get("/", protect, getMessages);

router.get(
  "/:id",
  protect,
  validateObjectId,
  getMessage
);

router.post(
  "/",
  contactRateLimiter,
  validate(validateMessage),
  createMessage
);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateMessage
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteMessage
);

export default router;