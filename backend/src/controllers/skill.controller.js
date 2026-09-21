import {
  getSkills as getSkillsService,
  createSkill as createSkillService,
  updateSkill as updateSkillService,
  deleteSkill as deleteSkillService,
} from "../services/skill.service.js";

export const getSkills = async (req, res, next) => {
  try {
    const skills = await getSkillsService();

    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = await createSkillService(req.body);

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await updateSkillService(
      req.params.id,
      req.body
    );

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    await deleteSkillService(req.params.id);

    const io = req.app.get("io");

    if (io) {
      io.emit("portfolio_updated");
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};