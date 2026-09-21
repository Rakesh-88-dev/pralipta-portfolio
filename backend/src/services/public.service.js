import Profile from "../models/Profile.js";
import Education from "../models/Education.js";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Certification from "../models/Certification.js";
import Settings from "../models/Settings.js";

export const getPublicPortfolio = async () => {
  const [
    profile,
    education,
    experience,
    projects,
    skills,
    certifications,
    settings,
  ] = await Promise.all([
    Profile.findOne({ isPublished: true }),
    Education.find({ isPublished: true }).sort({
      order: 1,
      startDate: -1,
    }),
    Experience.find({ isPublished: true }).sort({
      order: 1,
      startDate: -1,
    }),
    Project.find({ isPublished: true }).sort({
      order: 1,
      createdAt: -1,
    }),
    Skill.find({ isPublished: true }).sort({
      category: 1,
      order: 1,
    }),
    Certification.find({ isPublished: true }).sort({
      order: 1,
      issueDate: -1,
    }),
    Settings.findOne({ isPublished: true }),
  ]);

  return {
    profile,
    education,
    experience,
    projects,
    skills,
    certifications,
    settings,
  };
};