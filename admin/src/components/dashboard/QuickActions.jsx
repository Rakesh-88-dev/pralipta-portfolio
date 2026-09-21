import {
  UserRound,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Award,
  Image,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Edit Profile",
    description: "Update professional details",
    icon: UserRound,
    path: "/dashboard/profile",
  },
  {
    label: "Add Experience",
    description: "Add a professional role",
    icon: BriefcaseBusiness,
    path: "/dashboard/experience",
  },
  {
    label: "Add Project",
    description: "Add a portfolio project",
    icon: FolderKanban,
    path: "/dashboard/projects",
  },
  {
    label: "Add Education",
    description: "Add an academic record",
    icon: GraduationCap,
    path: "/dashboard/education",
  },
  {
    label: "Add Certification",
    description: "Add a certification",
    icon: Award,
    path: "/dashboard/certifications",
  },
  {
    label: "Manage Media",
    description: "Upload portfolio media",
    icon: Image,
    path: "/dashboard/media",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-[0_3px_14px_rgba(18,59,104,0.035)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
          Shortcuts
        </p>

        <h2 className="mt-1 text-xl font-semibold text-[#172033]">
          Quick Actions
        </h2>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.path}
              type="button"
              onClick={() => navigate(action.path)}
              className="group flex items-center gap-3 rounded-xl border border-[#E8EDF3] p-3 text-left transition-all duration-200 hover:border-[#D5E0EA] hover:bg-[#F8FAFC]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68] transition-colors group-hover:bg-[#123B68] group-hover:text-white">
                <Icon size={18} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#172033]">
                  {action.label}
                </p>

                <p className="mt-0.5 text-xs text-[#7A8798]">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}