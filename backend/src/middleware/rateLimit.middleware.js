import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many messages sent. Please try again later.",
  },
});