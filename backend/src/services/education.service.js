import Education from "../models/Education.js";

export const getEducation = async () => {
  return Education.find().sort({
    order: 1,
    startDate: -1,
  });
};

export const createEducation = async (data) => {
  return Education.create(data);
};

export const updateEducation = async (id, data) => {
  const education = await Education.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!education) {
    const error = new Error("Education record not found");
    error.statusCode = 404;
    throw error;
  }

  return education;
};

export const deleteEducation = async (id) => {
  const education = await Education.findByIdAndDelete(id);

  if (!education) {
    const error = new Error("Education record not found");
    error.statusCode = 404;
    throw error;
  }

  return education;
};