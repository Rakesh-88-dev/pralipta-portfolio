import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      enum: ["image", "document", "video"],
      required: true,
    },

    folder: {
      type: String,
      trim: true,
      default: "portfolio",
    },

    size: {
      type: Number,
      default: 0,
    },

    mimeType: {
      type: String,
      trim: true,
      default: "",
    },

    altText: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;