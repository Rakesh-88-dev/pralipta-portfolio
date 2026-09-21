function SkillTag({ skill }) {
  return (
    <span className="group inline-flex items-center gap-3 border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-sm text-[var(--text-body)] transition-all duration-300 hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--navy)] transition-colors duration-300 group-hover:bg-white" />

      <span>{skill}</span>
    </span>
  );
}

export default SkillTag;