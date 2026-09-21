import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isDocument = file.mimetype === "application/pdf";

    return {
      folder: "pralipta-portfolio",
      resource_type: isDocument ? "raw" : "image",
      allowed_formats: isDocument
        ? ["pdf"]
        : ["jpg", "jpeg", "png", "webp"],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Only JPG, PNG, WEBP images and PDF files are allowed."
      ),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;