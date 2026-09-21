import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },

   projectUrl: {
  type: String,
  default: "",
},

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

const Project = mongoose.model("Project", projectSchema);

export default Project;