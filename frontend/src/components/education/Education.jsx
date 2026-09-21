import SectionLabel from "../common/SectionLabel";
import SectionNumber from "../common/SectionNumber";
import SectionHeading from "../common/SectionHeading";
import EducationTimeline from "./EducationTimeline";

function Education({ education }) {
  return (
    <section id="education" className="section section-light">
      <div className="container-main">
        {/* Section Header */}
        <div className="relative z-10 flex items-start justify-between gap-8">
          <div className="flex flex-col">
            <SectionNumber number="03" />

            <SectionLabel label="Education" />
          </div>

          <span className="hidden pt-2 text-right text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            Academic Journey
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="relative z-10 mt-10 md:mt-14">
          <SectionHeading
            eyebrow="Academic Background"
            title={
              <>
                LEARNING
                <br />
                WITH
                <br />
                <span className="text-[var(--navy)]">PURPOSE.</span>
              </>
            }
          />
        </div>

        {/* Education Timeline */}
        <div className="relative z-10 mt-16 md:mt-24">
          <EducationTimeline education={education} />
        </div>
      </div>
    </section>
  );
}

export default Education;