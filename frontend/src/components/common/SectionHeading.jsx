function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
      )}

      <h2 className="max-w-5xl font-[var(--font-display)] text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[var(--text-dark)]">
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;