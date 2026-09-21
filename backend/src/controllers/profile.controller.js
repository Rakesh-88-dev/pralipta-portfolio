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

export const createProfile = async (req, res, next) => {
  try {
    const profile = await createProfileService(req.body);

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

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};