import {
  getEducation as getEducationService,
  createEducation as createEducationService,
  updateEducation as updateEducationService,
  deleteEducation as deleteEducationService,
} from "../services/education.service.js";

export const getEducation = async (req, res, next) => {
  try {
    const education = await getEducationService();

    return res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req, res, next) => {
  try {
    const education = await createEducationService(req.body);

    return res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const education = await updateEducationService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    await deleteEducationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};