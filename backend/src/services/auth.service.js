import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  const admin = await Admin.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!admin) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!admin.isActive) {
    const error = new Error("Admin account is inactive");
    error.statusCode = 403;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!passwordMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const token = generateToken(admin._id);

  return {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

export const getCurrentAdmin = async (adminId) => {
  const admin = await Admin.findById(adminId).select(
    "-password"
  );

  if (!admin) {
    const error = new Error("Admin account not found");
    error.statusCode = 404;
    throw error;
  }

  return admin;
};