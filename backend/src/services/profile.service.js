import Profile from "../models/Profile.js";

export const getProfile = async () => {
  return Profile.findOne();
};

export const createProfile = async (data) => {
  const existingProfile = await Profile.findOne();

  if (existingProfile) {
    const error = new Error("Profile already exists");
    error.statusCode = 409;
    throw error;
  }

  return Profile.create(data);
};

export const updateProfile = async (data) => {
  const profile = await Profile.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  return profile;
};