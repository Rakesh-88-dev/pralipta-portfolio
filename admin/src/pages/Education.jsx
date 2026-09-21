import { useEffect, useState } from "react";
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationService";

import PageHeader from "../components/PageHeader";
import StateMessage from "../components/StateMessage";

const emptyForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  grade: "",
  logo: "",
  order: 0,
  isPublished: true,
};

const formatDate = (date) => {
  if (!date) return "Present";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default function Education() {
  const [education, setEducation] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadEducation = async () => {
    try {
      setLoading(true);
      setLoadError(false);

      const data = await getEducation();

      setEducation(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load education:", error);

      setLoadError(true);

      toast.error(
        error.response?.data?.message ||
          "Unable to load education records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);

    setFormData({
      institution: item.institution || "",
      degree: item.degree || "",
      fieldOfStudy: item.fieldOfStudy || "",
      description: item.description || "",
      location: item.location || "",
      startDate: item.startDate
        ? item.startDate.slice(0, 10)
        : "",
      endDate: item.endDate
        ? item.endDate.slice(0, 10)
        : "",
      grade: item.grade || "",
      logo: item.logo || "",
      order: item.order ?? 0,
      isPublished: item.isPublished ?? true,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,
        order: Number(formData.order) || 0,
        endDate: formData.endDate || null,
      };

      if (editingId) {
        await updateEducation(editingId, payload);
        toast.success("Education updated successfully.");
      } else {
        await createEducation(payload);
        toast.success("Education added successfully.");
      }

      closeModal();
      await loadEducation();
    } catch (error) {
      console.error("Failed to save education:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to save education record."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?"
    );

    if (!confirmed) return;

    try {
      await deleteEducation(id);

      toast.success("Education deleted successfully.");

      await loadEducation();
    } catch (error) {
      console.error("Failed to delete education:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete education record."
      );
    }
  };

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <PageHeader
        title="Education"
        description="Manage academic qualifications and educational background shown on the portfolio."
        actionLabel="Add Education"
        actionIcon={Plus}
        onAction={openAddModal}
      >
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
          Portfolio
        </p>
      </PageHeader>

      <div className="rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-[0_3px_14px_rgba(18,59,104,0.035)]">
        <div className="flex items-center gap-4 border-b border-[#EEF2F6] pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
            <GraduationCap
              size={21}
              strokeWidth={1.7}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#172033]">
              Academic Records
            </h2>

            <p className="mt-0.5 text-sm text-[#7A8798]">
              Manage degrees, institutions, dates and academic details.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-6">
            <StateMessage
              type="loading"
              title="Loading education"
              message="Please wait while we load your academic records."
            />
          </div>
        ) : loadError ? (
          /* Error */
          <div className="mt-6">
            <StateMessage
              type="error"
              title="Unable to load education"
              message="We couldn't load your academic records. Please try again."
              onRetry={loadEducation}
              actionLabel="Retry"
            />
          </div>
        ) : education.length === 0 ? (
          /* Empty */
          <div className="mt-6">
            <StateMessage
              type="empty"
              title="No education records yet"
              message="Add your first academic record using the button above."
            />
          </div>
        ) : (
          /* Records */
          <div className="mt-6 space-y-4">
            {education.map((item) => (
              <article
                key={item._id}
                className="rounded-xl border border-[#E8EDF3] p-5 transition hover:border-[#D5E0EA]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
                      <GraduationCap size={19} />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-[#172033]">
                        {item.degree}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-[#526174]">
                        {item.institution}
                      </p>

                      {item.fieldOfStudy && (
                        <p className="mt-1 text-sm text-[#7A8798]">
                          {item.fieldOfStudy}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#7A8798]">
                        <span className="rounded-full bg-[#F1F5F9] px-3 py-1">
                          {formatDate(item.startDate)} —{" "}
                          {formatDate(item.endDate)}
                        </span>

                        {item.location && (
                          <span className="rounded-full bg-[#F1F5F9] px-3 py-1">
                            {item.location}
                          </span>
                        )}

                        {item.grade && (
                          <span className="rounded-full bg-[#F1F5F9] px-3 py-1">
                            {item.grade}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7A8798]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3EAF2] text-[#526174] transition hover:border-[#C9D6E2] hover:bg-[#F5F8FC] hover:text-[#123B68]"
                      aria-label="Edit education"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3EAF2] text-[#8A98AA] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete education"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/35 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-[#EEF2F6] bg-white px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-[#172033]">
                  {editingId ? "Edit Education" : "Add Education"}
                </h2>

                <p className="mt-1 text-sm text-[#7A8798]">
                  Enter the academic information for the portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#7A8798] transition hover:bg-[#F5F8FC] hover:text-[#172033]"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Institution *
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="Institution name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Degree *
                  </label>

                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="MBA"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Field of Study
                  </label>

                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    maxLength={150}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="Operations & HR"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength={150}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="Cuttack, Odisha"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Start Date *
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Grade
                  </label>

                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="8.5 CGPA"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Logo URL
                  </label>

                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="https://..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#526174]">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={2000}
                    rows={5}
                    className="w-full resize-y rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                    placeholder="Describe the education or academic experience..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-[#CBD5E1] accent-[#123B68]"
                    />

                    <span className="text-sm font-medium text-[#526174]">
                      Publish this education record
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-7 flex justify-end gap-3 border-t border-[#EEF2F6] pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-[#DCE5EE] px-4 py-3 text-sm font-medium text-[#526174] transition hover:bg-[#F5F8FC]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0F3157] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Education"
                      : "Add Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}