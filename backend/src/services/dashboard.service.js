import Profile from "../models/Profile.js";
import Education from "../models/Education.js";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Certification from "../models/Certification.js";
import Message from "../models/Message.js";

export const getDashboardStats = async () => {
  const [
    profileCount,
    educationCount,
    experienceCount,
    projectCount,
    skillCount,
    certificationCount,
    messageCount,
    unreadMessageCount,
  ] = await Promise.all([
    Profile.countDocuments(),
    Education.countDocuments(),
    Experience.countDocuments(),
    Project.countDocuments(),
    Skill.countDocuments(),
    Certification.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ status: "unread" }),
  ]);

  return {
    profileCount,
    educationCount,
    experienceCount,
    projectCount,
    skillCount,
    certificationCount,
    messageCount,
    unreadMessageCount,
  };
};