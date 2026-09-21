import { useEffect, useState } from "react";
import {
  Globe,
  Mail,
  Phone,
  Palette,
  Save,
  Share2,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  createSettings,
  getSettings,
  updateSettings,
} from "../services/settingsService";

import StateMessage from "../components/StateMessage";

const defaultForm = {
  siteTitle: "",
  siteDescription: "",
  footerText: "",
  favicon: "",
  logo: "",
  primaryColor: "#123B68",
  accentColor: "#7EA8D8",
  contactEmail: "",
  contactPhone: "",
  socialLinks: {
    linkedin: "",
    github: "",
    instagram: "",
    other: "",
  },
  maintenanceMode: false,
  isPublished: true,
};

const normalizeSettings = (data) => ({
  ...defaultForm,
  ...(data || {}),
  socialLinks: {
    ...defaultForm.socialLinks,
    ...(data?.socialLinks || {}),
  },
});

export default function Settings() {
  const [formData, setFormData] = useState(defaultForm);
  const [initialFormData, setInitialFormData] =
    useState(defaultForm);

  const [settingsExists, setSettingsExists] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [hasUnsavedChanges, setHasUnsavedChanges] =
    useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSettings();

      if (data) {
        const normalizedSettings =
          normalizeSettings(data);

        setFormData(normalizedSettings);
        setInitialFormData(normalizedSettings);
        setSettingsExists(Boolean(data._id));
        setHasUnsavedChanges(false);
      } else {
        setFormData(defaultForm);
        setInitialFormData(defaultForm);
        setSettingsExists(false);
        setHasUnsavedChanges(false);
      }
    } catch (err) {
      console.error(
        "Failed to load settings:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    const formChanged =
      JSON.stringify(formData) !==
      JSON.stringify(initialFormData);

    setHasUnsavedChanges(formChanged);
  }, [formData, initialFormData]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [hasUnsavedChanges]);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      const payload = {
        siteTitle: formData.siteTitle.trim(),
        siteDescription:
          formData.siteDescription.trim(),
        footerText: formData.footerText.trim(),
        favicon: formData.favicon.trim(),
        logo: formData.logo.trim(),

        primaryColor: formData.primaryColor,
        accentColor: formData.accentColor,

        contactEmail:
          formData.contactEmail.trim(),

        contactPhone:
          formData.contactPhone.trim(),

        socialLinks: {
          linkedin:
            formData.socialLinks.linkedin.trim(),

          github:
            formData.socialLinks.github.trim(),

          instagram:
            formData.socialLinks.instagram.trim(),

          other:
            formData.socialLinks.other.trim(),
        },

        maintenanceMode:
          formData.maintenanceMode,

        isPublished:
          formData.isPublished,
      };

      let savedSettings;

      if (settingsExists) {
        savedSettings =
          await updateSettings(payload);
      } else {
        savedSettings =
          await createSettings(payload);

        setSettingsExists(true);
      }

      if (savedSettings) {
        const normalizedSettings =
          normalizeSettings(savedSettings);

        setFormData(normalizedSettings);
        setInitialFormData(normalizedSettings);
      } else {
        setInitialFormData(formData);
      }

      setHasUnsavedChanges(false);

      toast.success(
        "Settings saved successfully."
      );
    } catch (err) {
      console.error(
        "Failed to save settings:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to save settings."
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
          title="Loading settings"
          message="Please wait while we load your website settings."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 sm:p-7 lg:p-8">
        <StateMessage
          type="error"
          title="Unable to load settings"
          message={error}
          onRetry={loadSettings}
        />
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            System
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526174]">
            Manage the portfolio website information,
            contact details, social links, appearance,
            and publishing settings.
          </p>
        </div>

        {hasUnsavedChanges && (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Unsaved changes
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Website Information */}
        <section className="rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E3EAF2] px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
              <Globe size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#172033]">
                Website information
              </h2>

              <p className="text-xs text-[#7A8798]">
                Basic information displayed across the
                portfolio.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6">
            {/* Site Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Site title
              </label>

              <input
                type="text"
                name="siteTitle"
                value={formData.siteTitle}
                onChange={handleChange}
                maxLength={200}
                placeholder="Pralipta Panda | Portfolio"
                className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />
            </div>

            {/* Site Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Site description
              </label>

              <textarea
                name="siteDescription"
                value={formData.siteDescription}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                placeholder="Professional portfolio description..."
                className="w-full resize-none rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />

              <p className="mt-1 text-right text-xs text-[#9AA6B5]">
                {formData.siteDescription.length}/500
              </p>
            </div>

            {/* Footer Text */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Footer text
              </label>

              <textarea
                name="footerText"
                value={formData.footerText}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                placeholder="© 2026 Pralipta Panda. All rights reserved."
                className="w-full resize-none rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />

              <p className="mt-1 text-right text-xs text-[#9AA6B5]">
                {formData.footerText.length}/500
              </p>
            </div>

            {/* Logo + Favicon */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172033]">
                  Logo URL
                </label>

                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172033]">
                  Favicon URL
                </label>

                <input
                  type="url"
                  name="favicon"
                  value={formData.favicon}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E3EAF2] px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
              <Mail size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#172033]">
                Contact information
              </h2>

              <p className="text-xs text-[#7A8798]">
                Contact details shown on the public
                portfolio.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Contact email
              </label>

              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="pralipta@example.com"
                className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Contact phone
              </label>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6B5]"
                />

                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] py-3 pl-10 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E3EAF2] px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
              <Share2 size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#172033]">
                Social links
              </h2>

              <p className="text-xs text-[#7A8798]">
                Add professional and social profile links.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                GitHub
              </label>

              <input
                type="url"
                name="github"
                value={formData.socialLinks.github}
                onChange={handleSocialChange}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Instagram
              </label>

              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/..."
                className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Other
              </label>

              <input
                type="url"
                name="other"
                value={formData.socialLinks.other}
                onChange={handleSocialChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
              />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E3EAF2] px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
              <Palette size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#172033]">
                Appearance
              </h2>

              <p className="text-xs text-[#7A8798]">
                Configure the main portfolio colors.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">
            {/* Primary */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Primary color
              </label>

              <div className="flex gap-3">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-[#E3EAF2] bg-white p-1"
                />

                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="min-w-0 flex-1 rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm font-medium uppercase text-[#172033] outline-none focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
                />
              </div>
            </div>

            {/* Accent */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#172033]">
                Accent color
              </label>

              <div className="flex gap-3">
                <input
                  type="color"
                  name="accentColor"
                  value={formData.accentColor}
                  onChange={handleChange}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-[#E3EAF2] bg-white p-1"
                />

                <input
                  type="text"
                  name="accentColor"
                  value={formData.accentColor}
                  onChange={handleChange}
                  className="min-w-0 flex-1 rounded-lg border border-[#E3EAF2] bg-[#FBFCFE] px-4 py-3 text-sm font-medium uppercase text-[#172033] outline-none focus:border-[#9CB4CC] focus:ring-2 focus:ring-[#123B68]/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Publishing */}
        <section className="rounded-2xl border border-[#E3EAF2] bg-white shadow-[0_8px_30px_rgba(18,59,104,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E3EAF2] px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#172033]">
                Publishing
              </h2>

              <p className="text-xs text-[#7A8798]">
                Control whether the portfolio is publicly
                available.
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-6">
            {/* Published */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#E3EAF2] p-4 transition hover:bg-[#FBFCFE]">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 accent-[#123B68]"
              />

              <span>
                <span className="block text-sm font-semibold text-[#172033]">
                  Publish website
                </span>

                <span className="mt-1 block text-xs leading-5 text-[#7A8798]">
                  Allow the public portfolio to be visible.
                </span>
              </span>
            </label>

            {/* Maintenance */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/40 p-4 transition hover:bg-amber-50">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={formData.maintenanceMode}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 accent-amber-600"
              />

              <span>
                <span className="block text-sm font-semibold text-[#172033]">
                  Maintenance mode
                </span>

                <span className="mt-1 block text-xs leading-5 text-[#7A8798]">
                  Enable this only when the public website
                  needs to temporarily show a maintenance
                  state.
                </span>
              </span>
            </label>
          </div>
        </section>

        {/* Save */}
        <div className="sticky bottom-4 z-20 flex justify-end">
          <div className="rounded-2xl border border-[#E3EAF2] bg-white/95 p-2 shadow-[0_12px_40px_rgba(18,59,104,0.10)] backdrop-blur">
            <button
              type="submit"
              disabled={saving || !hasUnsavedChanges}
              className="inline-flex items-center gap-2 rounded-xl bg-[#123B68] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0E3157] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <Save size={17} />
              )}

              {saving
                ? "Saving..."
                : hasUnsavedChanges
                  ? "Save settings"
                  : "All changes saved"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}