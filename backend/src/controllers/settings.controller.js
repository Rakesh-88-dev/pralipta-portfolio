import {
  getSettings as getSettingsService,
  createSettings as createSettingsService,
  updateSettings as updateSettingsService,
} from "../services/settings.service.js";

export const getSettings = async (req, res, next) => {
  try {
    const settings = await getSettingsService();

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const createSettings = async (req, res, next) => {
  try {
    const settings = await createSettingsService(req.body);

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(201).json({
      success: true,
      message: "Settings created successfully",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await updateSettingsService(req.body);

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};