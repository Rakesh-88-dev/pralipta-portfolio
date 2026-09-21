import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
  FileText,
  Video,
  Copy,
  Check,
  FolderOpen,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getMedia,
  uploadMedia,
  deleteMedia,
} from "../services/mediaService";

import StateMessage from "../components/StateMessage";

const emptyForm = {
  name: "",
  altText: "",
};

const formatFileSize = (bytes) => {
  if (!bytes || bytes <= 0) return "Unknown size";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date) => {
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

const getMediaIcon = (type) => {
  if (type === "video") return Video;
  if (type === "document") return FileText;

  return ImageIcon;
};

export default function Media() {
  const fileInputRef = useRef(null);

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [copiedId, setCopiedId] = useState(null);

  const loadMedia = async () => {
    try {
      setLoading(true);
      setLoadError(false);

      const data = await getMedia();

      setMedia(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load media:", error);

      setLoadError(true);

      toast.error(
        error.response?.data?.message ||
          "Failed to load media."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const openUploadModal = () => {
    setSelectedFile(null);
    setFormData(emptyForm);
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    if (uploading) return;

    setUploadModalOpen(false);
    setSelectedFile(null);
    setFormData(emptyForm);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    if (!formData.name) {
      const filenameWithoutExtension = file.name.replace(
        /\.[^/.]+$/,
        ""
      );

      setFormData((current) => ({
        ...current,
        name: filenameWithoutExtension,
      }));
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Media name is required.");
      return;
    }

    try {
      setUploading(true);

      const uploadData = new FormData();

      uploadData.append("file", selectedFile);
      uploadData.append("name", formData.name.trim());
      uploadData.append("altText", formData.altText.trim());

      await uploadMedia(uploadData);

      toast.success("Media uploaded successfully.");

      closeUploadModal();
      await loadMedia();
    } catch (error) {
      console.error("Failed to upload media:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to upload media."
      );
    } finally {
      setUploading(false);
    }
  };

  const openDeleteModal = (item) => {
    setMediaToDelete(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModalOpen(false);
    setMediaToDelete(null);
  };

  const handleDelete = async () => {
    if (!mediaToDelete) return;

    try {
      setDeleting(true);

      await deleteMedia(mediaToDelete._id);

      toast.success("Media deleted successfully.");

      closeDeleteModal();
      await loadMedia();
    } catch (error) {
      console.error("Failed to delete media:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete media."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleCopyUrl = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url);

      setCopiedId(item._id);

      toast.success("Media URL copied.");

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);

      toast.error("Could not copy the media URL.");
    }
  };

  const getPreview = (item) => {
    if (item.type === "image") {
      return (
        <img
          src={item.url}
          alt={item.altText || item.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      );
    }

    if (item.type === "video") {
      return (
        <video
          src={item.url}
          className="h-full w-full object-cover"
          controls
          preload="metadata"
        />
      );
    }

    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#F5F8FC] text-[#123B68]">
        <FileText size={42} strokeWidth={1.5} />

        <span className="max-w-[80%] truncate text-xs font-medium text-[#526174]">
          {item.name}
        </span>
      </div>
    );
  };

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            <FolderOpen size={15} />
            Portfolio
          </div>

          <h1 className="text-[30px] font-semibold tracking-[-0.02em] text-[#172033]">
            Media
          </h1>

          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[#526174]">
            Upload and manage images, documents and other media used
            throughout the portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={openUploadModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f3157]"
        >
          <Upload size={18} />
          Upload Media
        </button>
      </div>

      {/* Stats */}
      {!loading && !loadError && media.length > 0 && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E3EAF2] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8996A8]">
              Total Media
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#172033]">
              {media.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3EAF2] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8996A8]">
              Images
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#172033]">
              {media.filter((item) => item.type === "image").length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3EAF2] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8996A8]">
              Documents
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#172033]">
              {media.filter((item) => item.type === "document").length}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <StateMessage
          type="loading"
          title="Loading media"
          message="Please wait while we load your media library."
        />
      ) : loadError ? (
        <StateMessage
          type="error"
          title="Unable to load media"
          message="We couldn't load the media library. Please try again."
          onRetry={loadMedia}
        />
      ) : media.length === 0 ? (
        <StateMessage
          type="empty"
          title="No media uploaded"
          message="Upload portfolio images, certificates, documents and other assets that can be reused across the website."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {media.map((item) => {
            const MediaIcon = getMediaIcon(item.type);

            return (
              <div
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]"
              >
                {/* Preview */}
                <div className="relative h-52 overflow-hidden bg-[#F5F8FC]">
                  {getPreview(item)}

                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#526174] shadow-sm backdrop-blur">
                      <MediaIcon size={11} />
                      {item.type}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openDeleteModal(item)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-[#68768A] opacity-100 shadow-sm backdrop-blur transition hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Delete media"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-[#172033]">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-xs text-[#8996A8]">
                        {formatFileSize(item.size)}
                        {item.mimeType
                          ? ` • ${item.mimeType}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  {item.altText && (
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#68768A]">
                      {item.altText}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-[#EEF1F5] pt-3">
                    <span className="text-[11px] text-[#8996A8]">
                      {formatDate(item.createdAt)}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D9E2EC] px-2.5 py-1.5 text-[11px] font-semibold text-[#526174] transition hover:bg-[#F5F8FC] hover:text-[#123B68]"
                    >
                      {copiedId === item._id ? (
                        <>
                          <Check size={13} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          Copy URL
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8EDF3] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-[#172033]">
                  Upload Media
                </h2>

                <p className="mt-1 text-xs text-[#68768A]">
                  Upload an asset to Cloudinary and save it to your
                  media library.
                </p>
              </div>

              <button
                type="button"
                onClick={closeUploadModal}
                disabled={uploading}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#68768A] transition hover:bg-[#F5F8FC] hover:text-[#172033] disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6">
              {/* File Picker */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172033]">
                  File *
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex min-h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD6E2] bg-[#F9FBFD] px-6 text-center transition hover:border-[#7EA8D8] hover:bg-[#F5F8FC]"
                >
                  {selectedFile ? (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FA] text-[#123B68]">
                        <FileText size={22} />
                      </div>

                      <p className="mt-3 max-w-full truncate text-sm font-semibold text-[#172033]">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-xs text-[#8996A8]">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FA] text-[#123B68]">
                        <Upload size={22} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#172033]">
                        Choose a file
                      </p>

                      <p className="mt-1 text-xs text-[#8996A8]">
                        Images, videos, PDF and document files
                      </p>
                    </>
                  )}
                </button>
              </div>

              {/* Name */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#172033]">
                  Media Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  maxLength={200}
                  required
                  placeholder="e.g. Profile Photo"
                  className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                />
              </div>

              {/* Alt Text */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#172033]">
                  Alt Text
                </label>

                <textarea
                  name="altText"
                  value={formData.altText}
                  onChange={handleFormChange}
                  maxLength={300}
                  rows={3}
                  placeholder="Describe the image for accessibility..."
                  className="w-full resize-none rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#A2ADBA] focus:border-[#7EA8D8] focus:ring-4 focus:ring-[#7EA8D8]/10"
                />

                <p className="mt-1.5 text-[11px] text-[#8996A8]">
                  Helpful for accessibility and search engines.
                </p>
              </div>

              {/* Footer */}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#EEF1F5] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeUploadModal}
                  disabled={uploading}
                  className="rounded-xl border border-[#D9E2EC] px-5 py-3 text-sm font-semibold text-[#526174] transition hover:bg-[#F5F8FC] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3157] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={17} />
                      Upload Media
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
              Delete Media?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#68768A]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#172033]">
                {mediaToDelete?.name}
              </span>
              ? This will remove the media from the library.
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
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
                    Delete Media
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