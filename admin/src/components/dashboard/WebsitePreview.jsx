import { ExternalLink, Monitor, Smartphone } from "lucide-react";

export default function WebsitePreview() {
  return (
    <section className="rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-[0_3px_14px_rgba(18,59,104,0.035)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            Live Site
          </p>

          <h2 className="mt-1 text-xl font-semibold text-[#172033]">
            Website Preview
          </h2>
        </div>

        <a
          href="https://pralipta-portfolio.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#123B68] transition-colors hover:text-[#7EA8D8]"
        >
          Visit
          <ExternalLink size={15} />
        </a>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-[#DCE5EE] bg-[#F5F8FC]">
        {/* Browser bar */}
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

        {/* Preview */}
        <div className="p-4 sm:p-5">
          <div className="min-h-[190px] rounded-lg border border-[#E3EAF2] bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-20 rounded-full bg-[#123B68]" />

              <div className="hidden gap-3 sm:flex">
                <span className="h-2 w-10 rounded-full bg-[#E8EDF3]" />
                <span className="h-2 w-10 rounded-full bg-[#E8EDF3]" />
                <span className="h-2 w-10 rounded-full bg-[#E8EDF3]" />
              </div>
            </div>

            <div className="mt-8 max-w-sm">
              <div className="h-3 w-28 rounded-full bg-[#DCE5EE]" />

              <div className="mt-3 h-5 w-48 rounded-full bg-[#172033]" />

              <div className="mt-3 h-2.5 w-full max-w-xs rounded-full bg-[#EEF2F6]" />
              <div className="mt-2 h-2.5 w-4/5 rounded-full bg-[#EEF2F6]" />

              <div className="mt-5 h-8 w-24 rounded-lg bg-[#123B68]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#172033]">
            Pralipta Panda
          </p>

          <p className="mt-0.5 text-xs text-[#7A8798]">
            MBA Student · Operations & HR
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[#E3EAF2] bg-white p-1">
          <button
            type="button"
            aria-label="Desktop preview"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EAF1F8] text-[#123B68]"
          >
            <Monitor size={15} />
          </button>

          <button
            type="button"
            aria-label="Mobile preview"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#8A98AA] transition-colors hover:bg-[#F5F8FC] hover:text-[#123B68]"
          >
            <Smartphone size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}