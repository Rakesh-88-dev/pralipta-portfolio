import { ArrowUpRight } from "lucide-react";

import { useLenis } from "../../hooks/useLenis";

const navigation = [
  { label: "Home", target: "#home" },
  { label: "About", target: "#about" },
  { label: "Education", target: "#education" },
  { label: "Experience", target: "#experience" },
  { label: "Projects", target: "#projects" },
  { label: "Skills", target: "#skills" },
  { label: "Certifications", target: "#certifications" },
  { label: "Contact", target: "#contact" },
];

function Footer({ profile, settings }) {
  const { scrollTo } = useLenis();

  const name = profile?.name || "";
  const title = profile?.title || "";
  const tagline = profile?.tagline || "";

  const footerText =
    settings?.footerText ||
    "Building a professional journey around people, processes, continuous learning, and meaningful business impact.";

  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PP";

  const handleNavigation = (target) => {
    scrollTo(target);
  };

  return (
    <footer className="bg-[var(--navy-dark)] text-white">
      <div className="container-main">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 py-14 md:grid-cols-[1.3fr_0.7fr] md:py-20">
          {/* Brand */}
          <div>
            <button
              type="button"
              onClick={() => handleNavigation("#home")}
              className="group flex items-center gap-4 text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center border border-white/20 font-[var(--font-display)] text-lg font-medium transition-colors duration-300 group-hover:border-white">
                {initials}
              </span>

              <span>
                <span className="block text-sm font-semibold">
                  {name || "Portfolio"}
                </span>

                {title && (
                  <span className="mt-1 block max-w-xs text-[9px] uppercase tracking-[0.18em] text-white/40">
                    {title}
                  </span>
                )}
              </span>
            </button>

            <p className="mt-8 max-w-md text-sm leading-6 text-white/45">
              {tagline || footerText}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
              Navigation
            </p>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-4">
              {navigation.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigation(item.target)}
                  className="group flex items-center gap-2 text-left text-sm text-white/55 transition-colors duration-300 hover:text-white"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 py-6 text-[9px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {name || "Portfolio"}
          </span>

          {title && <span>{title}</span>}

          <button
            type="button"
            onClick={() => handleNavigation("#home")}
            className="text-left transition-colors duration-300 hover:text-white"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;