import Settings from "../models/Settings.js";

export const getSettings = async () => {
  return Settings.findOne();
};

export const createSettings = async (data) => {
  const existingSettings = await Settings.findOne();

  if (existingSettings) {
    const error = new Error("Settings already exist");
    error.statusCode = 409;
    throw error;
  }

  return Settings.create(data);
};

export const updateSettings = async (data) => {
  return Settings.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  );
};