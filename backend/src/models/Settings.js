import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    siteDescription: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    primaryColor: {
      type: String,
      default: "#123B68",
    },

    accentColor: {
      type: String,
      default: "#7EA8D8",
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    contactPhone: {
      type: String,
      trim: true,
      default: "",
    },

    socialLinks: {
      linkedin: {
        type: String,
        default: "",
      },

      github: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },

      other: {
        type: String,
        default: "",
      },
    },

    footerText: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    maintenanceMode: {
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

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;