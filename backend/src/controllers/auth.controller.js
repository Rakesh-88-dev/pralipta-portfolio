import {
  loginAdmin,
  getCurrentAdmin as getCurrentAdminService,
} from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginAdmin(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await getCurrentAdminService(req.admin._id);

    return res.status(200).json({
      success: true,
      data: {
        admin,
      },
    });
  } catch (error) {
    next(error);
  }
};