import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    tagline: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    linkedinUrl: {
      type: String,
      trim: true,
      default: "",
    },

    githubUrl: {
      type: String,
      trim: true,
      default: "",
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

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;