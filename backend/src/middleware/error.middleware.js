const errorMiddleware = (err, req, res, next) => {
  console.error("API Error:", err);

  let statusCode = err.statusCode || 500;
  let message =
    err.message || "Something went wrong on the server.";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  if (err.name === "MulterError") {
    statusCode = 400;
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      error: err.name,
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;