import sanitizeInput from "../utils/sanitizeInput.js";

const sanitizeMiddleware = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeInput(req.body);
  }

  if (req.params && typeof req.params === "object") {
    for (const [key, value] of Object.entries(req.params)) {
      if (typeof value === "string") {
        req.params[key] = sanitizeInput(value);
      }
    }
  }

  next();
};

export default sanitizeMiddleware;