import { ArrowDown } from "lucide-react";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import ProfessionalSnapshot from "./ProfessionalSnapshot";

function Hero({ profile }) {
  const resumeUrl = profile?.resumeUrl || "";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const resumeDownloadUrl = `${apiBaseUrl}/profile/resume`;

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[var(--cream)]"
    >
      <div className="container-main">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Hero Area */}
          <div className="flex min-h-screen items-center">
            <div className="w-full">
              <HeroContent profile={profile} />
            </div>
          </div>

          {/* Right Hero Area */}
          <div className="hidden min-h-screen items-center lg:flex">
            <HeroImage profile={profile} />
          </div>
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden">
          <HeroImage profile={profile} />
        </div>

        {/* Snapshot */}
        <ProfessionalSnapshot profile={profile} />

        {/* Resume Download */}
        {resumeUrl && (
          <div className="mt-16 border-t border-[var(--text-dark)]/15">
            <a
              href={resumeDownloadUrl}
              download="Pralipta-Panda-Resume.pdf"
              className="group grid grid-cols-1 border-b border-[var(--text-dark)]/15 transition-colors duration-300 hover:bg-[var(--white)]/40 md:grid-cols-[0.45fr_1fr_0.45fr]"
              aria-label="Download resume"
            >
              {/* Label */}
              <div className="border-b border-[var(--text-dark)]/10 px-0 py-6 md:border-b-0 md:border-r md:px-8">
                <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  Download
                </span>
              </div>

              {/* Resume Title */}
              <div className="flex items-center justify-between px-0 py-8 md:px-8">
                <span className="font-[var(--font-display)] text-5xl font-medium leading-none tracking-[-0.06em] text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-x-1 md:text-6xl">
                  RESUME
                </span>

                <ArrowDown
                  size={28}
                  strokeWidth={1.4}
                  className="ml-6 shrink-0 text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-y-1"
                />
              </div>

              {/* Meta */}
              <div className="hidden items-end justify-end px-8 py-8 md:flex">
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  PDF / CV
                </span>
              </div>
            </a>
          </div>
        )}
      </div>

      {/* Decorative Circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] top-1/2 -z-0 h-72 w-72 -translate-y-1/2 rounded-full border border-[var(--navy)]/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] top-1/2 -z-0 h-48 w-48 -translate-y-1/2 rounded-full border border-[var(--navy)]/5"
      />
    </section>
  );
}

export default Hero;