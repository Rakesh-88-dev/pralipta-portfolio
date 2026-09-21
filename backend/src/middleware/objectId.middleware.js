import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next();
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID",
    });
  }

  next();
};

export default validateObjectId;