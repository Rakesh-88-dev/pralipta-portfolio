import {
  LayoutDashboard,
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  FolderKanban,
  Lightbulb,
  Award,
  Image,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Portfolio",
    items: [
      {
        label: "Profile",
        path: "/dashboard/profile",
        icon: UserRound,
      },
      {
        label: "Education",
        path: "/dashboard/education",
        icon: GraduationCap,
      },
      {
        label: "Experience",
        path: "/dashboard/experience",
        icon: BriefcaseBusiness,
      },
      {
        label: "Projects",
        path: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        label: "Skills",
        path: "/dashboard/skills",
        icon: Lightbulb,
      },
      {
        label: "Certifications",
        path: "/dashboard/certifications",
        icon: Award,
      },
      {
        label: "Media",
        path: "/dashboard/media",
        icon: Image,
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        label: "Messages",
        path: "/dashboard/messages",
        icon: MessageSquare,
      },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-[#E3EAF2] bg-white transition-all duration-300 ${
        collapsed ? "w-[76px]" : "w-[250px]"
      }`}
    >
      {/* Brand */}
      <div
        className={`flex h-[76px] items-center border-b border-[#E3EAF2] ${
          collapsed ? "justify-center px-3" : "justify-between px-5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#123B68]">
            <span className="font-serif text-lg text-white">P</span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide text-[#123B68]">
                PRALIPTA
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8A98AA]">
                Portfolio
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {navigation.map((section) => (
          <div key={section.label} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA6B5]">
                {section.label}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `group flex items-center rounded-xl text-sm transition-all ${
                        collapsed
                          ? "justify-center px-2 py-3"
                          : "gap-3 px-3 py-2.5"
                      } ${
                        isActive
                          ? "bg-[#EAF1F8] font-medium text-[#123B68]"
                          : "text-[#607084] hover:bg-[#F5F8FC] hover:text-[#123B68]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2 : 1.7}
                          className="shrink-0"
                        />

                        {!collapsed && <span>{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

        {/* Settings */}
        <div className="mb-6">
          {!collapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA6B5]">
              System
            </p>
          )}

          <NavLink
            to="/dashboard/settings"
            title={collapsed ? "Settings" : undefined}
            className={({ isActive }) =>
              `group flex items-center rounded-xl text-sm transition-all ${
                collapsed
                  ? "justify-center px-2 py-3"
                  : "gap-3 px-3 py-2.5"
              } ${
                isActive
                  ? "bg-[#EAF1F8] font-medium text-[#123B68]"
                  : "text-[#607084] hover:bg-[#F5F8FC] hover:text-[#123B68]"
              }`
            }
          >
            <Settings size={18} strokeWidth={1.7} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#E3EAF2] p-3">
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center rounded-xl text-sm text-[#607084] transition hover:bg-[#FDF3F3] hover:text-[#B54747] ${
            collapsed
              ? "justify-center px-2 py-3"
              : "gap-3 px-3 py-2.5"
          }`}
        >
          <LogOut size={18} strokeWidth={1.7} />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          type="button"
          onClick={() => setCollapsed((previous) => !previous)}
          className="mt-2 flex w-full items-center justify-center rounded-xl border border-[#E3EAF2] py-2 text-[#8A98AA] transition hover:border-[#C9D5E2] hover:text-[#123B68]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span className="ml-2 text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}