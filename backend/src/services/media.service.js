import Media from "../models/Media.js";

import cloudinary from "../config/cloudinary.js";

export const getMedia = async () => {
  return Media.find().sort({
    createdAt: -1,
  });
};

export const getMediaById = async (id) => {
  const media = await Media.findById(id);

  if (!media) {
    const error = new Error("Media not found");
    error.statusCode = 404;
    throw error;
  }

  return media;
};

export const getMediaByUrl = async (url) => {
  const media = await Media.findOne({ url });

  if (!media) {
    const error = new Error("Media not found");
    error.statusCode = 404;
    throw error;
  }

  return media;
};

export const createMedia = async (data) => {
  return Media.create(data);
};

export const updateMedia = async (id, data) => {
  const media = await Media.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!media) {
    const error = new Error("Media not found");
    error.statusCode = 404;
    throw error;
  }

  return media;
};

export const deleteMedia = async (id) => {
  const media = await Media.findById(id);

  if (!media) {
    const error = new Error("Media not found");
    error.statusCode = 404;
    throw error;
  }

  if (media.publicId) {
    try {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type:
          media.type === "document" ? "raw" : "image",
      });
    } catch (error) {
      console.error(
        "Cloudinary deletion failed:",
        error.message
      );
    }
  }

  await Media.findByIdAndDelete(id);

  return media;
};