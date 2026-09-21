import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    issuingOrganization: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    credentialId: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    credentialUrl: {
      type: String,
      trim: true,
      default: "",
    },

    issueDate: {
      type: Date,
      default: null,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    certificateImage: {
      type: String,
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

const Certification = mongoose.model(
  "Certification",
  certificationSchema
);

export default Certification;