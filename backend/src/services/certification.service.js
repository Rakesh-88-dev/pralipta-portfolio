import Certification from "../models/Certification.js";

export const getCertifications = async () => {
  return Certification.find().sort({
    order: 1,
    issueDate: -1,
  });
};

export const getCertificationById = async (id) => {
  const certification = await Certification.findById(id);

  if (!certification) {
    const error = new Error("Certification not found");
    error.statusCode = 404;
    throw error;
  }

  return certification;
};

export const createCertification = async (data) => {
  return Certification.create(data);
};

export const updateCertification = async (id, data) => {
  const certification =
    await Certification.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!certification) {
    const error = new Error("Certification not found");
    error.statusCode = 404;
    throw error;
  }

  return certification;
};

export const deleteCertification = async (id) => {
  const certification =
    await Certification.findByIdAndDelete(id);

  if (!certification) {
    const error = new Error("Certification not found");
    error.statusCode = 404;
    throw error;
  }

  return certification;
};