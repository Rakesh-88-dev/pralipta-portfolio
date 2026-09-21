function ProfessionalSnapshot({ profile }) {
  const details = [
    {
      label: "Currently",
      value: profile?.title || "Professional",
    },
    {
      label: "Location",
      value: profile?.location || "Location not specified",
    },
    {
      label: "Email",
      value: profile?.email || "Email not specified",
    },
    {
      label: "Phone",
      value: profile?.phone || "Phone not specified",
    },
  ];

  return (
    <div className="mt-16 border-t border-[var(--border)] pt-6 md:mt-20">
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px w-10 bg-[var(--navy)]" />

        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
          Professional Snapshot
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((item, index) => (
          <div
            key={item.label}
            className={`py-5 sm:px-5 ${
              index === 0
                ? "sm:pl-0"
                : "border-t border-[var(--border)] sm:border-l sm:border-t-0"
            } ${
              index >= 2
                ? "lg:border-t-0"
                : ""
            }`}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {item.label}
            </p>

            <p className="mt-2 text-sm font-medium leading-6 text-[var(--text-dark)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfessionalSnapshot;