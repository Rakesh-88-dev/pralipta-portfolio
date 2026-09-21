import {
  BriefcaseBusiness,
  Users,
  Lightbulb,
  Target,
} from "lucide-react";

const qualities = [
  {
    title: "Operations",
    description:
      "A professional focus on understanding processes, workflows, and practical organizational outcomes.",
    icon: BriefcaseBusiness,
  },
  {
    title: "People",
    description:
      "An interest in people, collaboration, and the human side of organizational environments.",
    icon: Users,
  },
  {
    title: "Problem Solving",
    description:
      "A structured approach to understanding challenges and working toward practical solutions.",
    icon: Lightbulb,
  },
  {
    title: "Business Focus",
    description:
      "Connecting professional interests with broader organizational goals and outcomes.",
    icon: Target,
  },
];

function Qualities() {
  return (
    <div className="grid grid-cols-1 border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
      {qualities.map((quality, index) => {
        const Icon = quality.icon;

        return (
          <div
            key={quality.title}
            className={`group border-b border-[var(--border)] py-7 sm:px-6 sm:py-8 lg:border-b-0 ${
              index % 2 === 0 ? "sm:border-r" : ""
            } ${
              index < qualities.length - 2 ? "lg:border-r" : ""
            }`}
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                0{index + 1}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--navy)] group-hover:bg-[var(--navy)] group-hover:text-white">
                <Icon size={15} strokeWidth={1.4} />
              </span>
            </div>

            <h3 className="font-[var(--font-display)] text-2xl font-medium tracking-[-0.03em] text-[var(--text-dark)]">
              {quality.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-[var(--text-body)]">
              {quality.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Qualities;