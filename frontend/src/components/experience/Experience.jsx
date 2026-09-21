import SectionLabel from "../common/SectionLabel";
import SectionNumber from "../common/SectionNumber";
import SectionHeading from "../common/SectionHeading";
import ExperienceTimeline from "./ExperienceTimeline";

function Experience({ experience }) {
  return (
    <section
      id="experience"
      className="section section-white"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <SectionNumber number="04" />
            <SectionLabel label="Experience" />
          </div>

          <span className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            Professional Journey
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="mt-10 md:mt-14">
          <SectionHeading
            eyebrow="Professional Experience"
            title={
              <>
                LEARNING
                <br />
                THROUGH
                <br />
                <span className="text-[var(--navy)]">
                  EXPERIENCE.
                </span>
              </>
            }
          />
        </div>

        {/* Experience Timeline */}
        <div className="mt-16 md:mt-24">
          <ExperienceTimeline experience={experience} />
        </div>
      </div>
    </section>
  );
}

export default Experience;