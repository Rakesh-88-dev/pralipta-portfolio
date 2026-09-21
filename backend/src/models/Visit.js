import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    visitedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

visitSchema.index({ visitedAt: -1 });

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;