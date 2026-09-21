const isNonEmptyString = (value) => {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
};

const isValidEmail = (value) => {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
};

const isValidUrl = (value) => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

const createResult = (errors, data) => {
  return {
    valid: errors.length === 0,
    errors,
    data,
  };
};

export const validateLogin = (body = {}) => {
  const errors = [];

  if (!isValidEmail(body.email)) {
    errors.push("A valid email address is required.");
  }

  if (!isNonEmptyString(body.password)) {
    errors.push("Password is required.");
  }

  return createResult(errors, {
    email: body.email?.trim().toLowerCase(),
    password: body.password,
  });
};

export const validateMessage = (body = {}) => {
  const errors = [];

  if (!isNonEmptyString(body.name)) {
    errors.push("Name is required.");
  }

  if (!isValidEmail(body.email)) {
    errors.push("A valid email address is required.");
  }

  if (!isNonEmptyString(body.message)) {
    errors.push("Message is required.");
  }

  if (
    typeof body.message === "string" &&
    body.message.trim().length > 5000
  ) {
    errors.push("Message cannot exceed 5000 characters.");
  }

  if (
    body.subject &&
    typeof body.subject !== "string"
  ) {
    errors.push("Subject must be a valid text value.");
  }

  return createResult(errors, {
    name: body.name?.trim(),
    email: body.email?.trim().toLowerCase(),
    subject: body.subject?.trim() || "",
    message: body.message?.trim(),
  });
};

export const validateUrlFields = (
  body = {},
  fields = []
) => {
  const errors = [];

  for (const field of fields) {
    if (
      body[field] &&
      !isValidUrl(body[field])
    ) {
      errors.push(
        `${field} must be a valid HTTP or HTTPS URL.`
      );
    }
  }

  return createResult(errors, body);
};