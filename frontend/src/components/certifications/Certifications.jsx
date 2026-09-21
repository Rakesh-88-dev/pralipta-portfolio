import SectionLabel from "../common/SectionLabel";
import SectionNumber from "../common/SectionNumber";
import SectionHeading from "../common/SectionHeading";
import CertificationCard from "./CertificationCard";

function Certifications({ certifications = [] }) {
  const items = Array.isArray(certifications)
    ? certifications
    : [];

  return (
    <section
      id="certifications"
      className="section section-light"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <SectionNumber number="07" />
            <SectionLabel label="Certifications" />
          </div>

          <span className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            Professional Development
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="mt-10 md:mt-14">
          <SectionHeading
            eyebrow="Certifications & Credentials"
            title={
              <>
                ALWAYS
                <br />
                <span className="text-[var(--navy)]">
                  LEARNING.
                </span>
              </>
            }
          />
        </div>

        {/* Certification List */}
        <div className="mt-16 md:mt-24">
          {items.length === 0 ? (
            <div className="border-t border-[var(--border)] py-8">
              <p className="text-sm text-[var(--text-muted)]">
                Certifications will be updated soon.
              </p>
            </div>
          ) : (
            items.map((certification, index) => (
              <CertificationCard
                key={
                  certification?._id ||
                  `certification-${index}`
                }
                number={String(index + 1).padStart(2, "0")}
                name={certification?.name}
                issuingOrganization={
                  certification?.issuingOrganization
                }
                description={certification?.description}
                credentialId={certification?.credentialId}
                credentialUrl={certification?.credentialUrl}
                issueDate={certification?.issueDate}
                expiryDate={certification?.expiryDate}
                certificateImage={
                  certification?.certificateImage
                }
                logo={certification?.logo}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Certifications;