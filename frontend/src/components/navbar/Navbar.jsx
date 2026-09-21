import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "../../hooks/useLenis";

const menuItems = [
  { number: "01", label: "Home", target: "#home" },
  { number: "02", label: "About", target: "#about" },
  { number: "03", label: "Education", target: "#education" },
  { number: "04", label: "Experience", target: "#experience" },
  { number: "05", label: "Projects", target: "#projects" },
  { number: "06", label: "Skills", target: "#skills" },
  { number: "07", label: "Certifications", target: "#certifications" },
  { number: "08", label: "Contact", target: "#contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  const handleNavigation = (target) => {
    setIsMenuOpen(false);

    setTimeout(() => {
      scrollTo(target, {
        offset: -20,
      });
    }, 120);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed inset-x-0 top-0 z-40">
        <nav className="container-main flex h-20 items-center justify-between sm:h-24">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavigation("#home")}
            className="group flex min-w-0 items-center gap-3 text-left sm:gap-4"
            aria-label="Go to home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--navy)] bg-[var(--cream)] font-[var(--font-display)] text-base font-medium text-[var(--navy)] transition-all duration-300 group-hover:bg-[var(--navy)] group-hover:text-white sm:h-11 sm:w-11 sm:text-lg">
              PP
            </span>

            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold tracking-[-0.01em] text-[var(--text-dark)]">
                Pralipta Panda
              </span>

              <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                MBA | Operations & HR
              </span>
            </span>
          </button>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="group flex shrink-0 items-center gap-3 sm:gap-4"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--navy)] sm:block">
              Menu
            </span>

            <span className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[var(--border)] bg-[var(--cream)] transition-all duration-300 group-hover:border-[var(--navy)] sm:h-11 sm:w-11">
              <span className="block h-px w-5 bg-[var(--navy)] transition-transform duration-300 group-hover:translate-x-1" />

              <span className="mr-2.5 block h-px w-3 self-end bg-[var(--navy)] transition-transform duration-300 group-hover:-translate-x-1 sm:mr-3" />
            </span>
          </button>
        </nav>
      </header>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--navy-dark)] text-white transition-all duration-500 ${
          isMenuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="container-main flex min-h-[100dvh] flex-col">
          {/* Menu Header */}
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 sm:h-24">
            <button
              type="button"
              onClick={() => handleNavigation("#home")}
              className="flex items-center gap-3 text-left sm:gap-4"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-white/20 font-[var(--font-display)] text-base font-medium sm:h-11 sm:w-11 sm:text-lg">
                PP
              </span>

              <span className="hidden sm:block">
                <span className="block text-sm font-semibold">
                  Pralipta Panda
                </span>

                <span className="mt-0.5 block text-[9px] uppercase tracking-[0.18em] text-white/45">
                  MBA | Operations & HR
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="group flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 hover:border-white sm:h-11 sm:w-11"
              aria-label="Close navigation menu"
            >
              <X
                size={19}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-1 flex-col justify-center py-8 sm:py-12">
            <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <span className="h-px w-8 bg-white/30 sm:w-10" />

              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/45 sm:text-[10px] sm:tracking-[0.25em]">
                Navigation
              </span>
            </div>

            <div>
              {menuItems.map((item) => (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => handleNavigation(item.target)}
                  className="group flex w-full items-center border-b border-white/10 py-3.5 text-left transition-all duration-300 first:border-t sm:py-5"
                >
                  <span className="w-9 shrink-0 text-[9px] font-medium tracking-[0.12em] text-white/30 transition-colors duration-300 group-hover:text-[var(--accent)] sm:w-12 sm:text-[10px] sm:tracking-[0.15em]">
                    {item.number}
                  </span>

                  <span className="min-w-0 font-[var(--font-display)] text-[clamp(2rem,9vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-white/85 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white sm:group-hover:translate-x-3">
                    {item.label}
                  </span>

                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.2}
                    className="ml-auto mr-1 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 sm:mr-4 sm:h-6 sm:w-6"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Menu Footer */}
          <div className="flex shrink-0 flex-col gap-2 border-t border-white/10 py-5 text-[8px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:py-6 sm:text-[9px] sm:tracking-[0.18em]">
            <span>Pralipta Panda</span>
            <span>MBA | Operations & HR</span>
            <span>Portfolio / 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;