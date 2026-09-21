import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import Admin from "../src/models/Admin.js";

dotenv.config();

const rl = readline.createInterface({
  input,
  output,
});

const createAdmin = async () => {
  try {
    console.log("\n================================");
    console.log("     Create Portfolio Admin");
    console.log("================================\n");

    // =========================
    // Collect Admin Details
    // =========================

    const name = await rl.question("Admin name: ");
    const email = await rl.question("Admin email: ");
    const password = await rl.question("Admin password: ");

    // =========================
    // Basic Validation
    // =========================

    if (!name.trim() || !email.trim() || !password.trim()) {
      throw new Error("All fields are required.");
    }

    if (password.length < 8) {
      throw new Error(
        "Password must contain at least 8 characters."
      );
    }

    // =========================
    // Connect to MongoDB
    // =========================

    await mongoose.connect(process.env.MONGO_URI);

    console.log("\nConnected to MongoDB.");

    // =========================
    // Strict Single Admin Check
    // =========================

    const existingAdmin = await Admin.findOne({});

    if (existingAdmin) {
      throw new Error(
        "An admin account already exists. Only one admin is allowed."
      );
    }

    // =========================
    // Normalize Email
    // =========================

    const normalizedEmail = email.toLowerCase().trim();

    // =========================
    // Hash Password
    // =========================

    const hashedPassword = await bcrypt.hash(password, 12);

    // =========================
    // Create Admin
    // =========================

    const admin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    // =========================
    // Success
    // =========================

    console.log("\n================================");
    console.log("   Admin Created Successfully");
    console.log("================================");

    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);

    console.log("\nPassword has been securely hashed.");
    console.log("Only one admin account is allowed.");
    console.log("================================\n");

  } catch (error) {
    console.error("\n================================");
    console.error("     Admin Creation Failed");
    console.error("================================");
    console.error(error.message);
    console.error();

  } finally {
    await mongoose.disconnect();
    rl.close();
  }
};

createAdmin();