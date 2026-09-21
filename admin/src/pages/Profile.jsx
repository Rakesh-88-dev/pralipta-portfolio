import { useEffect, useState } from "react";
import {
  UserRound,
  Save,
  Loader2,
  Image,
  FileText,
  Link,
  GitBranch,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProfile, updateProfile } from "../services/profileService";
import PageHeader from "../components/PageHeader";
import StateMessage from "../components/StateMessage";

const initialFormData = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  profileImage: "",
  resumeUrl: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  githubUrl: "",
  isPublished: true,
};

export default function Profile() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setLoadError(false);

      const data = await getProfile();

      setFormData({
        name: data?.name || "",
        title: data?.title || "",
        tagline: data?.tagline || "",
        bio: data?.bio || "",
        profileImage: data?.profileImage || "",
        resumeUrl: data?.resumeUrl || "",
        email: data?.email || "",
        phone: data?.phone || "",
        location: data?.location || "",
        linkedinUrl: data?.linkedinUrl || "",
        githubUrl: data?.githubUrl || "",
        isPublished: data?.isPublished ?? true,
      });
    } catch (error) {
      console.error("Failed to load profile:", error);

      setLoadError(true);

      toast.error(
        error.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 sm:p-7 lg:p-8">
        <StateMessage
          type="loading"
          title="Loading profile"
          message="Please wait while we load your portfolio profile."
        />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-5 sm:p-7 lg:p-8">
        <StateMessage
          type="error"
          title="Unable to load profile"
          message="We couldn't load your profile information. Please try again."
          onRetry={loadProfile}
          actionLabel="Retry"
        />
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <PageHeader
        title="Profile"
        description="Manage the personal and professional information displayed on the portfolio website."
      >
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
          Portfolio
        </p>
      </PageHeader>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-[0_3px_14px_rgba(18,59,104,0.035)] sm:p-7"
      >
        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-[#EEF2F6] pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
            <UserRound size={21} strokeWidth={1.7} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#172033]">
              Professional Profile
            </h2>

            <p className="mt-0.5 text-sm text-[#7A8798]">
              Update the information visitors see on the portfolio.
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-8">
          {/* Basic Information */}
          <section>
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#172033]">
                Basic Information
              </h3>

              <p className="mt-1 text-xs text-[#7A8798]">
                Your name, professional identity and introduction.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="Full name"
                />
              </div>

              {/* Professional Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Professional Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="MBA Student · Operations & HR"
                />
              </div>

              {/* Tagline */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Tagline
                </label>

                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  maxLength={300}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="A short statement that represents your professional profile"
                />

                <p className="mt-1.5 text-xs text-[#9AA5B3]">
                  {formData.tagline.length}/300 characters
                </p>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={6}
                  maxLength={3000}
                  className="w-full resize-y rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="Write a professional introduction..."
                />

                <p className="mt-1.5 text-xs text-[#9AA5B3]">
                  {formData.bio.length}/3000 characters
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t border-[#EEF2F6] pt-7">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#172033]">
                Contact Information
              </h3>

              <p className="mt-1 text-xs text-[#7A8798]">
                Contact details displayed on the portfolio.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="Email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="Phone number"
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#526174]">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="City, State"
                />
              </div>
            </div>
          </section>

          {/* Portfolio Assets */}
          <section className="border-t border-[#EEF2F6] pt-7">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#172033]">
                Portfolio Assets
              </h3>

              <p className="mt-1 text-xs text-[#7A8798]">
                Add links for your profile image and resume.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Profile Image */}
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#526174]">
                  <Image size={16} />
                  Profile Image URL
                </label>

                <input
                  type="url"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="https://..."
                />

                {formData.profileImage && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E3EAF2] bg-[#F8FAFD] p-3">
                    <img
                      src={formData.profileImage}
                      alt="Profile preview"
                      className="h-14 w-14 rounded-xl object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#526174]">
                        Image preview
                      </p>

                      <p className="mt-0.5 truncate text-xs text-[#9AA5B3]">
                        {formData.profileImage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume */}
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#526174]">
                  <FileText size={16} />
                  Resume URL
                </label>

                <input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="https://..."
                />

                {formData.resumeUrl && (
                  <a
                    href={formData.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#123B68] hover:underline"
                  >
                    <Eye size={14} />
                    Preview resume
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Social Profiles */}
          <section className="border-t border-[#EEF2F6] pt-7">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#172033]">
                Social Profiles
              </h3>

              <p className="mt-1 text-xs text-[#7A8798]">
                Add professional social links displayed on the portfolio.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* LinkedIn */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#526174]">
                  <Link size={16} />
                  LinkedIn URL
                </label>

                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#526174]">
                  <GitBranch size={16} />
                  GitHub URL
                </label>

                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DCE5EE] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#7EA8D8] focus:ring-3 focus:ring-[#7EA8D8]/10"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </section>

          {/* Publishing */}
          <section className="border-t border-[#EEF2F6] pt-7">
            <div className="flex items-start justify-between gap-5 rounded-xl border border-[#E3EAF2] bg-[#F8FAFD] p-4">
              <div>
                <h3 className="text-sm font-semibold text-[#172033]">
                  Publish Profile
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-[#7A8798]">
                  When enabled, this profile can be displayed on the public
                  portfolio. Turn it off if you want to temporarily hide it.
                </p>
              </div>

              <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div className="h-6 w-11 rounded-full bg-[#DCE5EE] transition peer-checked:bg-[#123B68] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7EA8D8]/20" />

                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
              </label>
            </div>
          </section>
        </div>

        {/* Save */}
        <div className="mt-8 flex justify-end border-t border-[#EEF2F6] pt-5">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0F3157] disabled:cursor-not-allowed disabled:opacity-60"
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
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}