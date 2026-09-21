function EducationTimeline({ education = [] }) {
  const items = Array.isArray(education) ? education : [];

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatPeriod = (startDate, endDate) => {
    const start = formatDate(startDate);

    if (!start) return "";

    const end = endDate ? formatDate(endDate) : "Present";

    return `${start} — ${end}`;
  };

  return (
    <div className="border-t border-[var(--border)]">
      {items.length === 0 ? (
        <div className="py-10">
          <p className="text-sm text-[var(--text-muted)]">
            Education information will be updated soon.
          </p>
        </div>
      ) : (
        items.map((item, index) => {
          const period = formatPeriod(
            item?.startDate,
            item?.endDate
          );

          return (
            <article
              key={item?._id || `education-${index}`}
              className="grid grid-cols-1 gap-8 border-b border-[var(--border)] py-10 md:grid-cols-[80px_1.3fr_1fr_120px] md:items-start md:gap-10 md:py-12"
            >
              {/* Number */}
              <span className="text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Degree */}
              <div>
                <h3 className="font-[var(--font-display)] text-3xl font-medium leading-tight tracking-[-0.03em] text-[var(--text-dark)] md:text-4xl">
                  {item?.degree || "Education"}
                </h3>

                {item?.institution && (
                  <p className="mt-3 text-sm font-medium text-[var(--navy)]">
                    {item.institution}
                  </p>
                )}
              </div>

              {/* Details */}
              <div>
                {item?.fieldOfStudy && (
                  <>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Field of Study
                    </p>

                    <p className="mt-2 text-sm font-medium text-[var(--text-dark)]">
                      {item.fieldOfStudy}
                    </p>
                  </>
                )}

                {item?.location && (
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {item.location}
                  </p>
                )}

                {item?.description && (
                  <p className="mt-5 max-w-md text-sm leading-6 text-[var(--text-body)]">
                    {item.description}
                  </p>
                )}

                {item?.grade && (
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Grade: {item.grade}
                  </p>
                )}
              </div>

              {/* Period */}
              <p className="text-xs font-medium tracking-[0.08em] text-[var(--text-muted)] md:text-right">
                {period}
              </p>
            </article>
          );
        })
      )}
    </div>
  );
}

export default EducationTimeline;