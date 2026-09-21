import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    employmentType: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
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

    companyUrl: {
      type: String,
      trim: true,
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

const Experience = mongoose.model(
  "Experience",
  experienceSchema
);

export default Experience;