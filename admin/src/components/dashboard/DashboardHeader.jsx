import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  ExternalLink,
  Image,
  Lightbulb,
  Plus,
} from "lucide-react";

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const addContentOptions = [
    {
      label: "Add Project",
      description: "Create a portfolio project",
      path: "/dashboard/projects",
      icon: BriefcaseBusiness,
    },
    {
      label: "Add Experience",
      description: "Add a professional role",
      path: "/dashboard/experience",
      icon: BriefcaseBusiness,
    },
    {
      label: "Add Education",
      description: "Add an academic record",
      path: "/dashboard/education",
      icon: BookOpen,
    },
    {
      label: "Add Skill",
      description: "Add a professional skill",
      path: "/dashboard/skills",
      icon: Lightbulb,
    },
    {
      label: "Add Certification",
      description: "Add a certification",
      path: "/dashboard/certifications",
      icon: Award,
    },
    {
      label: "Upload Media",
      description: "Upload portfolio media",
      path: "/dashboard/media",
      icon: Image,
    },
  ];

  const handleAddContent = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="mb-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        {/* LEFT */}
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            Overview
          </p>

          <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.025em] text-[#172033] sm:text-[32px]">
            Good to see you, Pralipta.
          </h1>

          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[#68768A] sm:text-[15px]">
            Keep your professional portfolio up to date and make
            sure your latest achievements are ready to showcase.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://pralipta-portfolio.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE5EF] bg-white px-4 py-2.5 text-sm font-medium text-[#526174] shadow-sm transition hover:border-[#C8D6E5] hover:bg-[#F8FAFD] hover:text-[#172033]"
          >
            <ExternalLink size={16} strokeWidth={1.8} />
            View portfolio
          </a>

          {/* ADD CONTENT */}
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B68] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(18,59,104,0.16)] transition hover:bg-[#0E3156] focus:outline-none focus:ring-4 focus:ring-[#123B68]/10"
            >
              <Plus size={16} strokeWidth={2} />

              <span>Add content</span>

              <ChevronDown
                size={15}
                strokeWidth={1.9}
                className={`transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-[100] w-[310px] overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white p-2 shadow-[0_20px_50px_rgba(18,59,104,0.18)]">
                {/* MENU HEADER */}
                <div className="px-3 pb-3 pt-2">
                  <p className="text-sm font-semibold text-[#172033]">
                    Add to portfolio
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8996A8]">
                    Choose what you want to add.
                  </p>
                </div>

                <div className="border-t border-[#EEF2F6] pt-2">
                  {addContentOptions.map((option) => {
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.path}
                        type="button"
                        onClick={() =>
                          handleAddContent(option.path)
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#F5F8FC]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FA] text-[#123B68]">
                          <Icon
                            size={17}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#172033]">
                            {option.label}
                          </p>

                          <p className="mt-0.5 text-[11px] leading-5 text-[#8996A8]">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}