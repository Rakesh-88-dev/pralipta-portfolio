import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLenis } from "../../hooks/useLenis";

function HeroContent({ profile }) {
  const { scrollTo } = useLenis();

  const handleScrollTo = (target) => {
    scrollTo(target);
  };

  const title = profile?.title || "";
  const tagline = profile?.tagline || "";
  const bio = profile?.bio || "";

  return (
    <div className="flex w-full flex-col justify-center pt-32 sm:pt-40 lg:pt-[19rem]">
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px w-12 bg-[var(--navy)]" />

        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--navy)]">
          {title || "Professional Portfolio"}
        </p>
      </div>

      <h1 className="max-w-5xl font-[var(--font-display)] text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[var(--text-dark)]">
        TURNING
        <br />
        IDEAS INTO
        <br />
        <span className="text-[var(--navy)]">IMPACT.</span>
      </h1>

      <div className="mt-10 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="max-w-xl text-base leading-7 text-[var(--text-body)] md:text-lg">
            {bio || tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleScrollTo("#experience")}
            className="group inline-flex items-center gap-3 border-b border-[var(--navy)] pb-2 text-sm font-medium uppercase tracking-[0.12em] text-[var(--navy)] transition-all duration-300 hover:gap-5"
          >
            View Experience

            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between border-t border-[var(--border)] pt-5 md:mt-20">
        <button
          type="button"
          onClick={() => handleScrollTo("#about")}
          className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--navy)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--navy)]">
            <ArrowDown
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </span>

          Discover More
        </button>

        <span className="hidden text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] sm:block">
          01 / 08
        </span>
      </div>
    </div>
  );
}

export default HeroContent;