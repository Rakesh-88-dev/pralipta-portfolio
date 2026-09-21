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
  ExternalLink,
  CalendarDays,
  ShieldCheck,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../services/certificationService";

import PageHeader from "../components/PageHeader";
import StateMessage from "../components/StateMessage";

const emptyForm = {
  name: "",
  issuingOrganization: "",
  description: "",
  credentialId: "",
  credentialUrl: "",
  issueDate: "",
  expiryDate: "",
  certificateImage: "",
  logo: "",
  order: 0,
  isPublished: true,
};

const formatDateForInput = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};

const formatDisplayDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingCertification, setEditingCertification] =
    useState(null);

  const [certificationToDelete, setCertificationToDelete] =
    useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadCertifications = async () => {
    try {
      setLoading(true);
      setLoadError(false);

      const data = await getCertifications();

      setCertifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Failed to load certifications:",
        error
      );

      setLoadError(true);

      toast.error(
        error.response?.data?.message ||
          "Failed to load certifications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingCertification(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (certification) => {
    setEditingCertification(certification);

    setFormData({
      name: certification.name || "",
      issuingOrganization:
        certification.issuingOrganization || "",
      description: certification.description || "",
      credentialId: certification.credentialId || "",
      credentialUrl: certification.credentialUrl || "",
      issueDate: formatDateForInput(
        certification.issueDate
      ),
      expiryDate: formatDateForInput(
        certification.expiryDate
      ),
      certificateImage:
        certification.certificateImage || "",
      logo: certification.logo || "",
      order: certification.order ?? 0,
      isPublished:
        certification.isPublished !== false,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingCertification(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Certification name is required.");
      return;
    }

    if (!formData.issuingOrganization.trim()) {
      toast.error("Issuing organization is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),

        issuingOrganization:
          formData.issuingOrganization.trim(),

        description: formData.description.trim(),

        credentialId: formData.credentialId.trim(),

        credentialUrl: formData.credentialUrl.trim(),

        issueDate: formData.issueDate
          ? formData.issueDate
          : null,

        expiryDate: formData.expiryDate
          ? formData.expiryDate
          : null,

        certificateImage:
          formData.certificateImage.trim(),

        logo: formData.logo.trim(),

        order: Number(formData.order) || 0,

        isPublished: Boolean(formData.isPublished),
      };

      if (editingCertification) {
        await updateCertification(
          editingCertification._id,
          payload
        );

        toast.success(
          "Certification updated successfully."
        );
      } else {
        await createCertification(payload);

        toast.success(
          "Certification added successfully."
        );
      }

      closeModal();
      await loadCertifications();
    } catch (error) {
      console.error(
        "Failed to save certification:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save certification."
      );
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (certification) => {
    setCertificationToDelete(certification);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModalOpen(false);
    setCertificationToDelete(null);
  };

  const handleDelete = async () => {
    if (!certificationToDelete) return;

    try {
      setDeleting(true);

      await deleteCertification(
        certificationToDelete._id
      );

      toast.success(
        "Certification deleted successfully."
      );

      closeDeleteModal();
      await loadCertifications();
    } catch (error) {
      console.error(
        "Failed to delete certification:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete certification."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <PageHeader
        title="Certifications"
        description="Manage professional certifications, credentials and training achievements displayed on the portfolio."
        actionLabel="Add Certification"
        actionIcon={Plus}
        onAction={openAddModal}
      >
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
          Portfolio
        </p>
      </PageHeader>

      {/* Content */}
      {loading ? (
        <StateMessage
          type="loading"
          title="Loading certifications"
          message="Please wait while we load certification records."
        />
      ) : loadError ? (
        <StateMessage
          type="error"
          title="Unable to load certifications"
          message="We couldn't load the certification records. Please try again."
          onRetry={loadCertifications}
        />
      ) : certifications.length === 0 ? (
        <StateMessage
          type="empty"
          title="No certifications yet"
          message="Add certifications, professional courses and training achievements to strengthen the portfolio."
        />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {certifications.map((certification) => (
            <div
              key={certification._id}
              className="overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]"
            >
              {/* Certificate image */}
              {certification.certificateImage ? (
                <div className="h-48 overflow-hidden bg-[#F5F8FC]">
                  <img
                    src={certification.certificateImage}
                    alt={certification.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center bg-[#F5F8FC]">
                  <Award
                    size={42}
                    strokeWidth={1.5}
                    className="text-[#9BAABD]"
                  />
                </div>
              )}

              <div className="p-5">
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#EEF4FA] text-[#123B68]">
                      {certification.logo ? (
                        <img
                          src={certification.logo}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building2 size={19} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold leading-6 text-[#172033]">
                        {certification.name}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-[#526174]">
                        {certification.issuingOrganization}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(certification)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526174] transition hover:bg-[#F5F8FC] hover:text-[#123B68]"
                      title="Edit certification"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openDeleteModal(certification)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526174] transition hover:bg-red-50 hover:text-red-600"
                      title="Delete certification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      certification.isPublished
                        ? "bg-[#EEF8F2] text-[#287A4B]"
                        : "bg-[#F2F4F7] text-[#68768A]"
                    }`}
                  >
                    {certification.isPublished ? (
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

                  {certification.credentialId && (
                    <span className="rounded-full bg-[#F5F8FC] px-2.5 py-1 text-[11px] font-medium text-[#68768A]">
                      ID: {certification.credentialId}
                    </span>
                  )}
                </div>

                {/* Description */}
                {certification.description && (
                  <p className="mt-4 text-sm leading-6 text-[#526174]">
                    {certification.description}
                  </p>
                )}

                {/* Dates */}
                {(certification.issueDate ||
                  certification.expiryDate) && (
                  <div className="mt-4 flex flex-wrap gap-4 border-t border-[#EEF1F5] pt-4">
                    {certification.issueDate && (
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={15}
                          className="text-[#7EA8D8]"
                        />

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8996A8]">
                            Issued
                          </p>

                          <p className="text-xs font-medium text-[#526174]">
                            {formatDisplayDate(
                              certification.issueDate
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {certification.expiryDate && (
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={15}
                          className="text-[#7EA8D8]"
                        />

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8996A8]">
                            Expires
                          </p>

                          <p className="text-xs font-medium text-[#526174]">
                            {formatDisplayDate(
                              certification.expiryDate
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Credential */}
                {certification.credentialUrl && (
                  <div className="mt-5">
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#123B68] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#0f3157]"
                    >
                      <ShieldCheck size={14} />
                      Verify Credential
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/40 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8EDF3] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-[#172033]">
                  {editingCertification
                    ? "Edit Certification"
                    : "Add Certification"}
                </h2>

                <p className="mt-1 text-xs text-[#68768A]">
                  Add certification and credential details for
                  the portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#68768A] transition hover:bg-[#F5F8FC] hover:text-[#172033] disabled:opacity-50"
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
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Certification Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={200}
                    required
                    placeholder="e.g. Google Data Analytics Professional Certificate"
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Organization */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Issuing Organization *
                  </label>

                  <input
                    type="text"
                    name="issuingOrganization"
                    value={formData.issuingOrganization}
                    onChange={handleChange}
                    maxLength={200}
                    required
                    placeholder="e.g. Google / Coursera / Microsoft"
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={2000}
                    rows={4}
                    placeholder="Briefly describe what the certification covers..."
                    className="w-full resize-none rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Credential ID */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Credential ID
                  </label>

                  <input
                    type="text"
                    name="credentialId"
                    value={formData.credentialId}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="e.g. ABC123XYZ"
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Credential URL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Credential URL
                  </label>

                  <input
                    type="url"
                    name="credentialUrl"
                    value={formData.credentialUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Optional verification or certificate link.
                  </p>
                </div>

                {/* Issue Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Issue Date
                  </label>

                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Leave empty if the certification does not expire.
                  </p>
                </div>

                {/* Certificate Image */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Certificate Image URL
                  </label>

                  <input
                    type="url"
                    name="certificateImage"
                    value={formData.certificateImage}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Optional image of the certificate.
                  </p>
                </div>

                {/* Logo */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172033]">
                    Organization Logo URL
                  </label>

                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
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
                    className="w-full rounded-xl border border-[#D9E2EC] px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                  />

                  <p className="mt-1.5 text-[11px] text-[#8996A8]">
                    Lower numbers appear first.
                  </p>
                </div>

                {/* Published */}
                <div className="flex items-end">
                  <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#E3EAF2] bg-[#F9FBFD] px-4 py-3">
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
                        Show this certification publicly.
                      </p>
                    </div>
                  </label>
                </div>
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
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      {editingCertification
                        ? "Update Certification"
                        : "Save Certification"}
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
              Delete Certification?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#68768A]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#172033]">
                {certificationToDelete?.name}
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
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete Certification
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