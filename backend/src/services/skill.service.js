import Skill from "../models/Skill.js";

export const getSkills = async () => {
  return Skill.find().sort({
    category: 1,
    order: 1,
  });
};

export const createSkill = async (data) => {
  return Skill.create(data);
};

export const updateSkill = async (id, data) => {
  const skill = await Skill.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!skill) {
    const error = new Error("Skill not found");
    error.statusCode = 404;
    throw error;
  }

  return skill;
};

export const deleteSkill = async (id) => {
  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    const error = new Error("Skill not found");
    error.statusCode = 404;
    throw error;
  }

  return skill;
};