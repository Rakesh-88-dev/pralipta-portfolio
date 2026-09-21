import express from "express";

import {
  getPublicPortfolioData,
} from "../controllers/public.controller.js";

const router = express.Router();

router.get("/", getPublicPortfolioData);

export default router;