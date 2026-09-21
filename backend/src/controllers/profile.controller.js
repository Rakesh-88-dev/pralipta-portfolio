import {
  getProfile as getProfileService,
  createProfile as createProfileService,
  updateProfile as updateProfileService,
} from "../services/profile.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const profile = await getProfileService();

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const downloadResume = async (req, res, next) => {
  try {
    const profile = await getProfileService();

    if (!profile?.resumeUrl) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const response = await fetch(profile.resumeUrl);

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "Unable to retrieve resume",
      });
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Pralipta-Panda-Resume.pdf"'
    );

    res.setHeader("Content-Length", pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const profile = await createProfileService(req.body);

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await updateProfileService(req.body);

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};