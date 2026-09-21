function ExperienceTimeline({ experience = [] }) {
  const items = Array.isArray(experience) ? experience : [];

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
            Professional experience will be updated soon.
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
              key={item?._id || `experience-${index}`}
              className="grid grid-cols-1 gap-8 border-b border-[var(--border)] py-10 md:grid-cols-[80px_1.3fr_1fr_120px] md:items-start md:gap-10 md:py-12"
            >
              {/* Number */}
              <span className="text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Position */}
              <div>
                <h3 className="font-[var(--font-display)] text-3xl font-medium leading-tight tracking-[-0.03em] text-[var(--text-dark)] md:text-4xl">
                  {item?.position || "Professional Experience"}
                </h3>

                {item?.company && (
                  <p className="mt-3 text-sm font-medium text-[var(--navy)]">
                    {item.company}
                  </p>
                )}

                {item?.employmentType && (
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {item.employmentType}
                  </p>
                )}
              </div>

              {/* Details */}
              <div>
                {item?.location && (
                  <>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Location
                    </p>

                    <p className="mt-2 text-sm font-medium text-[var(--text-dark)]">
                      {item.location}
                    </p>
                  </>
                )}

                {item?.description && (
                  <p className="mt-5 max-w-md text-sm leading-6 text-[var(--text-body)]">
                    {item.description}
                  </p>
                )}

                {Array.isArray(item?.responsibilities) &&
                  item.responsibilities.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Responsibilities
                      </p>

                      <ul className="mt-3 space-y-2">
                        {item.responsibilities.map(
                          (responsibility, responsibilityIndex) => (
                            <li
                              key={`${item?._id || index}-responsibility-${responsibilityIndex}`}
                              className="flex gap-3 text-sm leading-6 text-[var(--text-body)]"
                            >
                              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[var(--navy)]" />
                              <span>{responsibility}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {Array.isArray(item?.technologies) &&
                  item.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.technologies.map(
                        (technology, technologyIndex) => (
                          <span
                            key={`${item?._id || index}-technology-${technologyIndex}`}
                            className="border border-[var(--border)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
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

export default ExperienceTimeline;