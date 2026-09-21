import Experience from "../models/Experience.js";

export const getExperience = async () => {
  return Experience.find().sort({
    order: 1,
    startDate: -1,
  });
};

export const createExperience = async (data) => {
  return Experience.create(data);
};

export const updateExperience = async (id, data) => {
  const experience = await Experience.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!experience) {
    const error = new Error("Experience record not found");
    error.statusCode = 404;
    throw error;
  }

  return experience;
};

export const deleteExperience = async (id) => {
  const experience = await Experience.findByIdAndDelete(id);

  if (!experience) {
    const error = new Error("Experience record not found");
    error.statusCode = 404;
    throw error;
  }

  return experience;
};