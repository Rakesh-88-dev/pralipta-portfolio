import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import ProfessionalSnapshot from "./ProfessionalSnapshot";

function Hero({ profile }) {
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
          <div className="hidden lg:flex min-h-screen items-center">
            <HeroImage profile={profile} />
          </div>
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden">
          <HeroImage profile={profile} />
        </div>

        {/* Snapshot */}
        <ProfessionalSnapshot profile={profile} />
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