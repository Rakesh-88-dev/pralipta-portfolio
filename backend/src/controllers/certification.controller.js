import {
  getCertifications as getCertificationsService,
  getCertificationById as getCertificationByIdService,
  createCertification as createCertificationService,
  updateCertification as updateCertificationService,
  deleteCertification as deleteCertificationService,
} from "../services/certification.service.js";

export const getCertifications = async (req, res, next) => {
  try {
    const certifications = await getCertificationsService();

    return res.status(200).json({
      success: true,
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

export const getCertification = async (req, res, next) => {
  try {
    const certification =
      await getCertificationByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

export const createCertification = async (req, res, next) => {
  try {
    const certification =
      await createCertificationService(req.body);

    return res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (req, res, next) => {
  try {
    const certification =
      await updateCertificationService(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (req, res, next) => {
  try {
    await deleteCertificationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};