import { useState } from "react";
import {
  ExternalLink,
  Monitor,
  Smartphone,
  RefreshCw,
} from "lucide-react";

const PORTFOLIO_URL = "https://pralipta-portfolio.vercel.app";

export default function WebsitePreview() {
  const [viewMode, setViewMode] = useState("desktop");
  const [refreshKey, setRefreshKey] = useState(0);

  const isMobile = viewMode === "mobile";

  return (
    <section className="rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-[0_3px_14px_rgba(18,59,104,0.035)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            Live Site
          </p>

          <h2 className="mt-1 text-xl font-semibold text-[#172033]">
            Website Preview
          </h2>

          <p className="mt-1 text-sm text-[#7A8798]">
            Preview the public portfolio directly from your dashboard.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            type="button"
            onClick={() => setRefreshKey((prev) => prev + 1)}
            aria-label="Refresh preview"
            title="Refresh preview"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3EAF2] bg-white text-[#6F7E91] transition hover:bg-[#F5F8FC] hover:text-[#123B68]"
          >
            <RefreshCw size={15} />
          </button>

          {/* Visit */}
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#123B68] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#0E3157]"
          >
            Visit
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* Browser Preview */}
      <div className="mt-5 overflow-hidden rounded-xl border border-[#DCE5EE] bg-[#F5F8FC]">
        {/* Browser Bar */}
        <div className="flex items-center gap-2 border-b border-[#DCE5EE] bg-white px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D5DDE6]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D5DDE6]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D5DDE6]" />

          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-md bg-[#F3F6F9] px-3 py-1.5">
            <span className="truncate text-xs text-[#7A8798]">
              pralipta-portfolio.vercel.app
            </span>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex min-h-[420px] justify-center bg-[#EEF3F8] p-4 sm:p-6">
          <div
            className={`relative overflow-hidden rounded-lg border border-[#D7E1EB] bg-white shadow-[0_4px_20px_rgba(18,59,104,0.08)] transition-all duration-300 ${
              isMobile
                ? "w-[375px] max-w-full"
                : "w-full"
            }`}
          >
            {/* Mobile top bar */}
            {isMobile && (
              <div className="flex h-7 items-center justify-center border-b border-[#E3EAF2] bg-white">
                <div className="h-1.5 w-16 rounded-full bg-[#D5DDE6]" />
              </div>
            )}

            <iframe
              key={refreshKey}
              src={PORTFOLIO_URL}
              title="Pralipta Panda Portfolio Preview"
              className="block h-[380px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Portfolio Info */}
        <div>
          <p className="text-sm font-semibold text-[#172033]">
            Pralipta Panda
          </p>

          <p className="mt-0.5 text-xs text-[#7A8798]">
            MBA Student · Operations & HR
          </p>
        </div>

        {/* Device Switcher */}
        <div className="flex w-fit items-center gap-1 rounded-lg border border-[#E3EAF2] bg-white p-1">
          {/* Desktop */}
          <button
            type="button"
            onClick={() => setViewMode("desktop")}
            aria-label="Desktop preview"
            title="Desktop preview"
            className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
              viewMode === "desktop"
                ? "bg-[#EAF1F8] text-[#123B68]"
                : "text-[#8A98AA] hover:bg-[#F5F8FC] hover:text-[#123B68]"
            }`}
          >
            <Monitor size={15} />
          </button>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            aria-label="Mobile preview"
            title="Mobile preview"
            className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
              viewMode === "mobile"
                ? "bg-[#EAF1F8] text-[#123B68]"
                : "text-[#8A98AA] hover:bg-[#F5F8FC] hover:text-[#123B68]"
            }`}
          >
            <Smartphone size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}