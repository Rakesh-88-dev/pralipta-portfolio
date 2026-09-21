import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import certificationRoutes from "./routes/certification.routes.js";
import messageRoutes from "./routes/message.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import publicRoutes from "./routes/public.routes.js";
import visitRoutes from "./routes/visit.routes.js";

import sanitizeMiddleware from "./middleware/sanitize.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");

/* ----------------------------- SECURITY ----------------------------- */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/* ------------------------------- CORS ------------------------------- */

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,

      // Local admin development
      "http://localhost:5174",

      // Optional: Vite's common default port
      "http://localhost:5173",
    ].filter(Boolean),

    credentials: true,
  })
);

/* ----------------------------- BODY PARSER -------------------------- */

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

/* ------------------------------ COOKIES ----------------------------- */

app.use(cookieParser());

/* ----------------------------- SANITIZE ----------------------------- */

app.use(sanitizeMiddleware);

/* ------------------------------- HEALTH ----------------------------- */

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

/* ------------------------------- ROUTES ----------------------------- */

app.use("/api/public", publicRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/education", educationRoutes);

app.use("/api/experience", experienceRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/certifications", certificationRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/media", mediaRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/visits", visitRoutes);

/* ------------------------------- 404 -------------------------------- */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ------------------------- ERROR HANDLER ---------------------------- */

app.use(errorMiddleware);

export default app;