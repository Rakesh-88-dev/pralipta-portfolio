import {
  getExperience as getExperienceService,
  createExperience as createExperienceService,
  updateExperience as updateExperienceService,
  deleteExperience as deleteExperienceService,
} from "../services/experience.service.js";

export const getExperience = async (req, res, next) => {
  try {
    const experience = await getExperienceService();

    return res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const experience = await createExperienceService(req.body);

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const experience = await updateExperienceService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    await deleteExperienceService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};