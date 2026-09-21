import { ArrowUpRight } from "lucide-react";

function HeroImage({ profile }) {
  const imageUrl = profile?.profileImage || "";

  const name = profile?.name || "Pralipta Panda";

  return (
    <div className="relative mt-14 w-full md:mt-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--accent-light)]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="block font-[var(--font-display)] text-8xl font-medium leading-none tracking-[-0.05em] text-[var(--navy)]/10">
                PP
              </span>

              <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Profile Image
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[var(--navy)] px-5 py-4 text-white">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
              Profile
            </p>

            <p className="mt-1 text-sm font-medium">
              {name}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25">
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-7 font-[var(--font-display)] text-6xl font-medium leading-none tracking-[-0.05em] text-[var(--navy)]/10 md:-right-8 md:-top-10 md:text-8xl"
      >
        01
      </span>
    </div>
  );
}

export default HeroImage;