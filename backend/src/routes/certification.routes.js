import express from "express";

import {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certification.controller.js";

import protect from "../middleware/auth.middleware.js";
import validateObjectId from "../middleware/objectId.middleware.js";

const router = express.Router();

router.get("/", getCertifications);

router.get(
  "/:id",
  validateObjectId,
  getCertification
);

router.post("/", protect, createCertification);

router.put(
  "/:id",
  protect,
  validateObjectId,
  updateCertification
);

router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteCertification
);

export default router;