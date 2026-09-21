import Project from "../models/Project.js";

export const getProjects = async (
  page = 1,
  limit = 12
) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageLimit = Math.min(
    Math.max(Number(limit) || 12, 1),
    100
  );

  const skip = (currentPage - 1) * pageLimit;

  const [projects, total] = await Promise.all([
    Project.find()
      .sort({
        order: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(pageLimit),
    Project.countDocuments(),
  ]);

  return {
    projects,
    pagination: {
      page: currentPage,
      limit: pageLimit,
      total,
      totalPages: Math.ceil(total / pageLimit),
      hasNextPage: currentPage * pageLimit < total,
      hasPreviousPage: currentPage > 1,
    },
  };
};

export const getProjectById = async (id) => {
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

export const createProject = async (data) => {
  return Project.create(data);
};

export const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

export const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};