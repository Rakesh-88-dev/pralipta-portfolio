import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    fieldOfStudy: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    grade: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model(
  "Education",
  educationSchema
);

export default Education;