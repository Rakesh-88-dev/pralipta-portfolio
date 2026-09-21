function SectionNumber({ number }) {
  return (
    <span className="block font-[var(--font-display)] text-5xl font-medium leading-none tracking-[-0.04em] text-[var(--navy)] md:text-6xl">
      {number}
    </span>
  );
}

export default SectionNumber;