function AboutContent({ profile }) {
  const bio = profile?.bio || "";
  const tagline = profile?.tagline || "";
  const title = profile?.title || "";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <div>
        <p className="max-w-3xl font-[var(--font-display)] text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[var(--text-dark)]">
          {tagline || "People, process &"}
          <br />
          <span className="text-[var(--navy)]">
            purpose.
          </span>
        </p>
      </div>

      <div className="flex flex-col justify-end">
        {bio && (
          <p className="text-base leading-7 text-[var(--text-body)] md:text-lg">
            {bio}
          </p>
        )}

        {title && (
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--navy)]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutContent;