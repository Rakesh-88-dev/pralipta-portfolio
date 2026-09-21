import { ArrowUpRight } from "lucide-react";

function CertificationCard({
  number,
  name,
  issuingOrganization,
  description,
  credentialId,
  credentialUrl,
  issueDate,
  expiryDate,
  certificateImage,
  logo,
}) {
  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formattedIssueDate = formatDate(issueDate);
  const formattedExpiryDate = formatDate(expiryDate);

  return (
    <article className="group border-t border-[var(--border)] py-7 md:py-9">
      <div className="grid grid-cols-[48px_1fr] gap-5 md:grid-cols-[70px_1fr_auto] md:gap-8">
        {/* Number */}
        <span className="pt-1 text-[10px] font-medium tracking-[0.16em] text-[var(--text-muted)]">
          {number}
        </span>

        {/* Certification Details */}
        <div>
          <div className="flex items-start gap-4">
            {logo && (
              <img
                src={logo}
                alt=""
                className="h-10 w-10 shrink-0 object-contain"
              />
            )}

            <div>
              <h3 className="font-[var(--font-display)] text-2xl font-medium leading-tight tracking-[-0.03em] text-[var(--text-dark)] md:text-3xl">
                {name || "Certification"}
              </h3>

              {issuingOrganization && (
                <p className="mt-2 text-sm font-medium text-[var(--navy)]">
                  {issuingOrganization}
                </p>
              )}
            </div>
          </div>

          {description && (
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--text-body)]">
              {description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
            {formattedIssueDate && (
              <span>Issued {formattedIssueDate}</span>
            )}

            {formattedExpiryDate && (
              <span>Expires {formattedExpiryDate}</span>
            )}

            {credentialId && (
              <span>Credential ID: {credentialId}</span>
            )}
          </div>

          {certificateImage && (
            <div className="mt-6">
              <img
                src={certificateImage}
                alt={`${name || "Certification"} certificate`}
                className="max-h-64 w-auto max-w-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Credential Link */}
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--navy)] transition-all duration-300 hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-white md:flex"
            aria-label={`View ${name || "certification"} credential`}
          >
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
            />
          </a>
        )}
      </div>

      {/* Mobile Credential Link */}
      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--navy)] md:hidden"
        >
          View Credential

          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
          />
        </a>
      )}
    </article>
  );
}

export default CertificationCard;