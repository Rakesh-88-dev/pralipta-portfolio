const sanitizeString = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/[<>]/g, "")
    .trim();
};

const sanitizeObject = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeObject);
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const sanitized = {};

    for (const [key, item] of Object.entries(value)) {
      sanitized[key] = sanitizeObject(item);
    }

    return sanitized;
  }

  return sanitizeString(value);
};

export default sanitizeObject;