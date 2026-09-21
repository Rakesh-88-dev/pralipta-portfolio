import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Award,
  Code2,
  Users,
  Settings,
  ChartNoAxesCombined,
  UsersRound,
  MessageCircle,
  Table2,
  ClipboardList,
  BriefcaseBusiness,
  GraduationCap,
  Presentation,
  Lightbulb,
  Handshake,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/skillService";

import PageHeader from "../components/PageHeader";

const emptyForm = {
  name: "",
  category: "",
  level: "Intermediate",
  icon: "Award",
  order: 0,
  isPublished: true,
};

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const iconOptions = [
  {
    name: "Award",
    label: "General",
    Icon: Award,
  },
  {
    name: "Users",
    label: "HR / People",
    Icon: Users,
  },
  {
    name: "Settings",
    label: "Operations",
    Icon: Settings,
  },
  {
    name: "ChartNoAxesCombined",
    label: "Analytics",
    Icon: ChartNoAxesCombined,
  },
  {
    name: "UsersRound",
    label: "Leadership",
    Icon: UsersRound,
  },
  {
    name: "MessageCircle",
    label: "Communication",
    Icon: MessageCircle,
  },
  {
    name: "Table2",
    label: "Excel / Data",
    Icon: Table2,
  },
  {
    name: "ClipboardList",
    label: "Project Management",
    Icon: ClipboardList,
  },
  {
    name: "BriefcaseBusiness",
    label: "Business",
    Icon: BriefcaseBusiness,
  },
  {
    name: "GraduationCap",
    label: "Academic",
    Icon: GraduationCap,
  },
  {
    name: "Presentation",
    label: "Presentation",
    Icon: Presentation,
  },
  {
    name: "Lightbulb",
    label: "Problem Solving",
    Icon: Lightbulb,
  },
  {
    name: "Handshake",
    label: "Teamwork",
    Icon: Handshake,
  },
  {
    name: "BarChart3",
    label: "Business Analysis",
    Icon: BarChart3,
  },
  {
    name: "FileSpreadsheet",
    label: "Reporting",
    Icon: FileSpreadsheet,
  },
];

const iconMap = {
  Award,
  Users,
  Settings,
  ChartNoAxesCombined,
  UsersRound,
  MessageCircle,
  Table2,
  ClipboardList,
  BriefcaseBusiness,
  GraduationCap,
  Presentation,
  Lightbulb,
  Handshake,
  BarChart3,
  FileSpreadsheet,
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingSkill, setEditingSkill] = useState(null);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadSkills = async () => {
    try {
      setLoading(true);

      const data = await getSkills();

      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load skills:", error);

      toast.error(
        error.response?.data?.message || "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectIcon = (iconName) => {
    setFormData((current) => ({
      ...current,
      icon: iconName,
    }));
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);

    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "Intermediate",
      icon: skill.icon || "Award",
      order: skill.order ?? 0,
      isPublished: skill.isPublished !== false,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingSkill(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Skill name is required.");
      return;
    }

    if (!formData.category.trim()) {
      toast.error("Skill category is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        level: formData.level,
        icon: formData.icon || "Award",
        order: Number(formData.order) || 0,
        isPublished: Boolean(formData.isPublished),
      };

      if (editingSkill) {
        await updateSkill(editingSkill._id, payload);
        toast.success("Skill updated successfully.");
      } else {
        await createSkill(payload);
        toast.success("Skill added successfully.");
      }

      closeModal();
      await loadSkills();
    } catch (error) {
      console.error("Failed to save skill:", error);

      toast.error(
        error.response?.data?.message || "Failed to save skill."
      );
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (skill) => {
    setSkillToDelete(skill);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModalOpen(false);
    setSkillToDelete(null);
  };

  const handleDelete = async () => {
    if (!skillToDelete) return;

    try {
      setDeleting(true);

      await deleteSkill(skillToDelete._id);

      toast.success("Skill deleted successfully.");

      closeDeleteModal();
      await loadSkills();
    } catch (error) {
      console.error("Failed to delete skill:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete skill."
      );
    } finally {
      setDeleting(false);
    }
  };

  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  const getSkillIcon = (iconName) => {
    return iconMap[iconName] || Award;
  };

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <PageHeader
        title="Skills"
        description="Manage professional, technical and business skills displayed on the portfolio."
        actionLabel="Add Skill"
        actionIcon={Plus}
        onAction={openAddModal}
      >
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
          Portfolio
        </p>
      </PageHeader>

      {/* Skills */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#E3EAF2] bg-white">
          <div className="flex items-center gap-3 text-sm text-[#526174]">
            <Loader2 className="animate-spin" size={20} />
            Loading skills...
          </div>
        </div>
      ) : skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#CBD6E2] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F8FC] text-[#123B68]">
            <Award size={26} />
          </div>

          <h2 className="text-lg font-semibold text-[#172033]">
            No skills yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68768A]">
            Add professional, technical or business skills to showcase
            Pralipta&apos;s capabilities.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={17} />
            Add First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(
            ([category, categorySkills]) => (
              <section
                key={category}
                className="rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-[0_8px_30px_rgba(18,59,104,0.04)] sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#172033]">
                      {category}
                    </h2>

                    <p className="mt-1 text-xs text-[#8996A8]">
                      {categorySkills.length}{" "}
                      {categorySkills.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FA] text-[#123B68]">
                    <Code2 size={19} />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {categorySkills.map((skill) => {
                    const SkillIcon = getSkillIcon(skill.icon);

                    return (
                      <div
                        key={skill._id}
                        className="group rounded-xl border border-[#E5EBF2] bg-[#FBFCFE] p-4 transition hover:border-[#C9D8E8] hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FA] text-[#123B68]">
                              <SkillIcon size={18} />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-semibold text-[#172033]">
                                {skill.name}
                              </h3>

                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-xs text-[#68768A]">
                                  {skill.level}
                                </span>

                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    skill.isPublished
                                      ? "bg-[#43A86B]"
                                      : "bg-[#AAB4C0]"
                                  }`}
                                />

                                <span className="text-[11px] text-[#8996A8]">
                                  {skill.isPublished
                                    ? "Published"
                                    : "Draft"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => openEditModal(skill)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#68768A] transition hover:bg-[#EEF4FA] hover:text-[#123B68]"
                              title="Edit skill"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => openDeleteModal(skill)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#68768A] transition hover:bg-red-50 hover:text-red-600"
                              title="Delete skill"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[11px] text-[#8996A8]">
                            <span>Proficiency</span>
                            <span>{skill.level}</span>
                          </div>

                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E9EEF4]">
                            <div
                              className="h-full rounded-full bg-[#7EA8D8] transition-all"
                              style={{
                                width:
                                  skill.level === "Beginner"
                                    ? "25%"
                                    : skill.level === "Intermediate"
                                    ? "50%"
                                    : skill.level === "Advanced"
                                    ? "75%"
                                    : "100%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/40 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8EDF3] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-[#172033]">
                  {editingSkill ? "Edit Skill" : "Add Skill"}
                </h2>

                <p className="mt-1 text-xs text-[#68768A]">
                  Add a professional skill and define its proficiency level.
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

            <form onSubmit={handleSubmit} className="px-6 py-6">
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Skill Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    placeholder="e.g. Human Resource Management"
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Category *
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    placeholder="e.g. HR, Operations, Analytics"
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Level */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Proficiency Level
                  </label>

                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Icon Selector */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-[#172033]">
                      Skill Icon
                    </label>

                    <span className="text-xs text-[#8996A8]">
                      Selected: {formData.icon || "Award"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {iconOptions.map((option) => {
                      const Icon = option.Icon;
                      const selected = formData.icon === option.name;

                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => selectIcon(option.name)}
                          className={`flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-xl border p-2 transition ${
                            selected
                              ? "border-[#123B68] bg-[#EEF4FA] text-[#123B68] ring-2 ring-[#7EA8D8]/20"
                              : "border-[#E3EAF2] bg-white text-[#68768A] hover:border-[#C9D8E8] hover:bg-[#F9FBFD]"
                          }`}
                        >
                          <Icon size={20} />

                          <span className="text-center text-[10px] font-medium leading-tight">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
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
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Lower numbers appear first.
                  </p>
                </div>

                {/* Published */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E3EAF2] bg-[#F9FBFD] px-4 py-3">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#123B68]"
                  />

                  <div className="flex items-center gap-2">
                    {formData.isPublished ? (
                      <Eye size={16} className="text-[#287A4B]" />
                    ) : (
                      <EyeOff size={16} className="text-[#68768A]" />
                    )}

                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        Published
                      </p>

                      <p className="text-xs text-[#68768A]">
                        Make this skill visible on the public portfolio.
                      </p>
                    </div>
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
                      {editingSkill ? "Update Skill" : "Save Skill"}
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
              Delete Skill?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#68768A]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#172033]">
                {skillToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="rounded-xl border border-[#D9E2EC] px-5 py-3 text-sm font-semibold text-[#526174] transition hover:bg-[#F5F8FC] disabled:opacity-50"
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
                    Delete Skill
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