import {
  getProjects as getProjectsService,
  getProjectById as getProjectByIdService,
  createProject as createProjectService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
} from "../services/project.service.js";

export const getProjects = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const result = await getProjectsService(page, limit);

    return res.status(200).json({
      success: true,
      data: result.projects,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await getProjectByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await createProjectService(req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await updateProjectService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};