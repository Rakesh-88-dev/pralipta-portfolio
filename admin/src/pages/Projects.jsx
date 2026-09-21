import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  FolderKanban,
  X,
  Save,
  Loader2,
  Star,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

import PageHeader from "../components/PageHeader";

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  technologies: "",
  features: "",
  image: "",
  liveUrl: "",
  projectUrl: "",
  category: "",
  order: 0,
  isFeatured: false,
  isPublished: true,
};

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load projects:", error);

      toast.error(
        error.response?.data?.message || "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);

    setFormData({
      title: project.title || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join("\n")
        : "",
      features: Array.isArray(project.features)
        ? project.features.join("\n")
        : "",
      image: project.image || "",
      liveUrl: project.liveUrl || "",
      projectUrl: project.projectUrl || "",
      category: project.category || "",
      order: project.order ?? 0,
      isFeatured: Boolean(project.isFeatured),
      isPublished: project.isPublished !== false,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingProject(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Project title is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),

        technologies: formData.technologies
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        features: formData.features
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        image: formData.image.trim(),
        liveUrl: formData.liveUrl.trim(),
        projectUrl: formData.projectUrl.trim(),
        category: formData.category.trim(),

        order: Number(formData.order) || 0,

        isFeatured: Boolean(formData.isFeatured),
        isPublished: Boolean(formData.isPublished),
      };

      if (editingProject) {
        await updateProject(editingProject._id, payload);
        toast.success("Project updated successfully.");
      } else {
        await createProject(payload);
        toast.success("Project added successfully.");
      }

      closeModal();
      await loadProjects();
    } catch (error) {
      console.error("Failed to save project:", error);

      toast.error(
        error.response?.data?.message || "Failed to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      setDeleting(true);

      await deleteProject(projectToDelete._id);

      toast.success("Project deleted successfully.");

      closeDeleteModal();
      await loadProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete project."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <PageHeader
        title="Projects"
        description="Manage portfolio projects, academic work, case studies and professional projects."
        actionLabel="Add Project"
        actionIcon={Plus}
        onAction={openAddModal}
      >
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
          Portfolio
        </p>
      </PageHeader>

      {/* Content */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#E3EAF2] bg-white">
          <div className="flex items-center gap-3 text-sm text-[#526174]">
            <Loader2 className="animate-spin" size={20} />
            Loading projects...
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#CBD6E2] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F8FC] text-[#123B68]">
            <FolderKanban size={25} />
          </div>

          <h2 className="text-lg font-semibold text-[#172033]">
            No projects yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68768A]">
            Add academic projects, MBA case studies, internships or other
            professional work to showcase on the portfolio.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={17} />
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]"
            >
              {/* Project Image */}
              {project.image ? (
                <div className="h-48 overflow-hidden bg-[#F5F8FC]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center bg-[#F5F8FC]">
                  <FolderKanban
                    size={42}
                    strokeWidth={1.5}
                    className="text-[#9BAABD]"
                  />
                </div>
              )}

              <div className="p-5">
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {project.category && (
                        <span className="rounded-full bg-[#EEF4FA] px-2.5 py-1 text-[11px] font-semibold text-[#123B68]">
                          {project.category}
                        </span>
                      )}

                      {project.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7E6] px-2.5 py-1 text-[11px] font-semibold text-[#9A6700]">
                          <Star size={11} fill="currentColor" />
                          Featured
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          project.isPublished
                            ? "bg-[#EEF8F2] text-[#287A4B]"
                            : "bg-[#F2F4F7] text-[#68768A]"
                        }`}
                      >
                        {project.isPublished ? (
                          <>
                            <Eye size={11} />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={11} />
                            Draft
                          </>
                        )}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-[#172033]">
                      {project.title}
                    </h2>

                    {project.shortDescription && (
                      <p className="mt-2 text-sm leading-6 text-[#526174]">
                        {project.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526174] transition hover:bg-[#F5F8FC] hover:text-[#123B68]"
                      title="Edit project"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(project)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526174] transition hover:bg-red-50 hover:text-red-600"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Technologies */}
                {Array.isArray(project.technologies) &&
                  project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology, index) => (
                        <span
                          key={`${technology}-${index}`}
                          className="rounded-lg border border-[#E3EAF2] bg-white px-2.5 py-1.5 text-xs font-medium text-[#526174]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                {/* Links */}
                {(project.liveUrl || project.projectUrl) && (
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-[#EEF1F5] pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#123B68] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#0f3157]"
                      >
                        <ExternalLink size={14} />
                        View Project
                      </a>
                    )}

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#D9E2EC] bg-white px-3.5 py-2 text-xs font-semibold text-[#123B68] transition hover:bg-[#F5F8FC]"
                      >
                        <FileText size={14} />
                        Case Study
                      </a>
                    )}
                  </div>
                )}

                {/* Date */}
                {project.createdAt && (
                  <p className="mt-4 text-[11px] text-[#8996A8]">
                    Added {formatDate(project.createdAt)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/40 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8EDF3] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-[#172033]">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h2>

                <p className="mt-1 text-xs text-[#68768A]">
                  Add the details you want to showcase on the portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#68768A] transition hover:bg-[#F5F8FC] hover:text-[#172033]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto px-6 py-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Project Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={200}
                    required
                    placeholder="e.g. Employee Engagement Study"
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="e.g. HR / Operations"
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Short Description */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Short Description
                  </label>

                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    maxLength={500}
                    rows={3}
                    placeholder="A short summary of the project..."
                    className="w-full resize-none rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Detailed Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={3000}
                    rows={6}
                    placeholder="Describe the project, objectives, methodology and outcomes..."
                    className="w-full resize-none rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Technologies / Tools
                  </label>

                  <textarea
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    rows={6}
                    placeholder={`Enter one per line\nExcel\nPower BI\nSPSS`}
                    className="w-full resize-none rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Enter one item per line.
                  </p>
                </div>

                {/* Features */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Key Features / Contributions
                  </label>

                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows={6}
                    placeholder={`Enter one per line\nData analysis\nProcess improvement\nRecommendations`}
                    className="w-full resize-none rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Enter one item per line.
                  </p>
                </div>

                {/* Image */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Project Image URL
                  </label>

                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Live URL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Project / Demo Link
                  </label>

                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Case Study URL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Case Study / Document Link
                  </label>

                  <input
                    type="url"
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E3EAF2] bg-[#F9FBFD] px-4 py-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#123B68]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[#172033]">
                      Featured Project
                    </p>
                    <p className="text-xs text-[#68768A]">
                      Highlight this project on the portfolio.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E3EAF2] bg-[#F9FBFD] px-4 py-3">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#123B68]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[#172033]">
                      Published
                    </p>
                    <p className="text-xs text-[#68768A]">
                      Make this project visible publicly.
                    </p>
                  </div>
                </label>
              </div>

              {/* Footer */}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#EEF1F5] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-[#D9E2EC] px-5 py-3 text-sm font-semibold text-[#526174] transition hover:bg-[#F5F8FC] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3157] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      {editingProject ? "Update Project" : "Save Project"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#172033]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-[#172033]">
              Delete Project?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#68768A]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#172033]">
                {projectToDelete?.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="rounded-xl border border-[#D9E2EC] px-5 py-3 text-sm font-semibold text-[#526174] hover:bg-[#F5F8FC] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete Project
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}