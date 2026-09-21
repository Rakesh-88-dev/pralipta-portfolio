import SectionLabel from "../common/SectionLabel";
import SectionNumber from "../common/SectionNumber";
import SectionHeading from "../common/SectionHeading";
import ProjectCard from "./ProjectCard";

function Projects({ projects = [] }) {
  const items = Array.isArray(projects) ? projects : [];

  return (
    <section
      id="projects"
      className="section section-light"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <SectionNumber number="05" />
            <SectionLabel label="Projects" />
          </div>

          <span className="hidden text-right text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            Selected Work
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="mt-10 md:mt-14">
          <SectionHeading
            eyebrow="Selected Projects"
            title={
              <>
                IDEAS
                <br />
                INTO
                <br />
                <span className="text-[var(--navy)]">
                  ACTION.
                </span>
              </>
            }
          />
        </div>

        {/* Projects Grid */}
        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
          {items.length === 0 ? (
            <div className="border-t border-[var(--border)] py-8 md:col-span-2">
              <p className="text-sm text-[var(--text-muted)]">
                Projects will be updated soon.
              </p>
            </div>
          ) : (
            items.map((project, index) => (
              <ProjectCard
                key={project?._id || `project-${index}`}
                number={String(index + 1).padStart(2, "0")}
                category={project?.category}
                title={project?.title}
                description={
                  project?.shortDescription ||
                  project?.description ||
                  ""
                }
                technologies={project?.technologies}
                image={project?.image}
                link={project?.liveUrl || project?.projectUrl}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;