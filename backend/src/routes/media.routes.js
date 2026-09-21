import express from "express";

import {
  getMedia,
  getMediaItem,
  downloadMedia,
  uploadMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/media.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", protect, getMedia);

router.get(
  "/:id",
  protect,
  validateObjectId,
  getMediaItem
);

router.get(
  "/:id/download",
  validateObjectId,
  downloadMedia
);

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadMedia
);

router.post("/", protect, createMedia);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateMedia
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteMedia
);

export default router;