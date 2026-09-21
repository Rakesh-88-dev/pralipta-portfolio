import {
  getMedia as getMediaService,
  getMediaById as getMediaByIdService,
  createMedia as createMediaService,
  updateMedia as updateMediaService,
  deleteMedia as deleteMediaService,
} from "../services/media.service.js";

export const getMedia = async (req, res, next) => {
  try {
    const media = await getMediaService();

    return res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const getMediaItem = async (req, res, next) => {
  try {
    const media = await getMediaByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const media = await createMediaService({
      name: req.body.name || req.file.originalname,
      url: req.file.path,
      publicId: req.file.filename,
      type:
        req.file.mimetype === "application/pdf"
          ? "document"
          : "image",
      folder: "pralipta-portfolio",
      size: req.file.size || 0,
      mimeType: req.file.mimetype,
      altText: req.body.altText || "",
    });

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const createMedia = async (req, res, next) => {
  try {
    const media = await createMediaService(req.body);

    return res.status(201).json({
      success: true,
      message: "Media created successfully",
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMedia = async (req, res, next) => {
  try {
    const media = await updateMediaService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Media updated successfully",
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    await deleteMediaService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};