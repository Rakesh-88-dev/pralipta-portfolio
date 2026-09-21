function SectionLabel({ label }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <span className="h-px w-8 bg-[var(--navy)]" />

      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--navy)]">
        {label}
      </span>
    </div>
  );
}

export default SectionLabel;