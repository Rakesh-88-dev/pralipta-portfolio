import SectionLabel from "../common/SectionLabel";
import SectionNumber from "../common/SectionNumber";
import SectionHeading from "../common/SectionHeading";
import SkillTag from "./SkillTag";

function Skills({ skills = [] }) {
  const items = Array.isArray(skills) ? skills : [];

  const groupedSkills = items.reduce((groups, skill) => {
    const category = skill?.category;

    if (!category) return groups;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  const skillGroups = Object.entries(groupedSkills);

  return (
    <section
      id="skills"
      className="section section-white"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <SectionNumber number="06" />
            <SectionLabel label="Skills" />
          </div>

          <span className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            Core Capabilities
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="mt-10 md:mt-14">
          <SectionHeading
            eyebrow="Professional Skills"
            title={
              <>
                SKILLS
                <br />
                THAT
                <br />
                <span className="text-[var(--navy)]">
                  CREATE VALUE.
                </span>
              </>
            }
          />
        </div>

        {/* Skill Groups */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {skillGroups.length === 0 ? (
            <div className="border-t border-[var(--border)] py-8 md:col-span-2">
              <p className="text-sm text-[var(--text-muted)]">
                Skills will be updated soon.
              </p>
            </div>
          ) : (
            skillGroups.map(([category, categorySkills], index) => (
              <div
                key={category}
                className="border-t border-[var(--border)] pt-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[var(--font-display)] text-2xl font-medium tracking-[-0.03em] text-[var(--text-dark)]">
                    {category}
                  </h3>

                  <span className="text-[10px] font-medium tracking-[0.15em] text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <SkillTag
                      key={skill?._id || skill?.name}
                      skill={skill?.name}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;