const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema(req.body);

      if (!result.valid) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.errors,
        });
      }

      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;