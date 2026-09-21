import { ArrowUpRight } from "lucide-react";

function ProjectCard({
  number,
  category,
  title,
  description,
  technologies = [],
  image,
  link,
}) {
  return (
    <article className="group border-t border-[var(--border)] pt-6">
      {/* Project Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--accent-light)]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-[var(--font-display)] text-7xl font-medium tracking-[-0.05em] text-[var(--navy)]/10">
              {number}
            </span>
          </div>
        )}

        {/* Project Number */}
        <span className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center border border-white/30 bg-[var(--navy)] px-2 text-[10px] font-medium tracking-[0.12em] text-white">
          {number}
        </span>

        {/* Project Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title}`}
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--navy)] opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </a>
        )}
      </div>

      {/* Project Information */}
      <div className="pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--navy)]">
          {category}
        </p>

        <div className="mt-3 flex items-start justify-between gap-6">
          <h3 className="font-[var(--font-display)] text-3xl font-medium leading-tight tracking-[-0.03em] text-[var(--text-dark)] md:text-4xl">
            {title}
          </h3>

          {link && (
            <ArrowUpRight
              size={20}
              strokeWidth={1.4}
              className="mt-1 shrink-0 text-[var(--text-muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--navy)]"
            />
          )}
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-body)]">
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="border border-[var(--border)] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]"
              >
                {technology}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;