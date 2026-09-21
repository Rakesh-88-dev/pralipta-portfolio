import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  MessageSquare,
  Users,
  UserRoundCheck,
} from "lucide-react";
import { getDashboardStats } from "../../services/dashboardService";
import { getVisitStats } from "../../services/visitorService";

const statConfig = [
  {
    key: "totalVisits",
    label: "Total Visits",
    description: "Portfolio visits",
    icon: Users,
    source: "visits",
  },
  {
    key: "uniqueVisitors",
    label: "Unique Visitors",
    description: "Distinct visitors",
    icon: UserRoundCheck,
    source: "visits",
  },
  {
    key: "experienceCount",
    label: "Experience",
    description: "Professional roles",
    icon: BriefcaseBusiness,
    source: "dashboard",
  },
  {
    key: "projectCount",
    label: "Projects",
    description: "Portfolio projects",
    icon: FolderKanban,
    source: "dashboard",
  },
  {
    key: "educationCount",
    label: "Education",
    description: "Academic records",
    icon: GraduationCap,
    source: "dashboard",
  },
  {
    key: "messageCount",
    label: "Messages",
    description: "Visitor messages",
    icon: MessageSquare,
    source: "dashboard",
  },
];

export default function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [visitStats, setVisitStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [dashboardData, visitorData] = await Promise.all([
          getDashboardStats(),
          getVisitStats(),
        ]);

        setStats(dashboardData || {});
        setVisitStats(visitorData || {});
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);

        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (error) {
    return (
      <section className="mb-8">
        <div className="rounded-2xl border border-[#E3EAF2] bg-white px-5 py-6">
          <p className="text-sm font-medium text-[#172033]">
            Dashboard statistics unavailable
          </p>

          <p className="mt-1 text-sm text-[#8A98AA]">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statConfig.map((stat) => {
          const Icon = stat.icon;

          const value =
            stat.source === "visits"
              ? visitStats?.[stat.key] ?? 0
              : stats?.[stat.key] ?? 0;

          return (
            <article
              key={stat.key}
              className="group rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-[0_3px_14px_rgba(18,59,104,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D3DFEA] hover:shadow-[0_8px_24px_rgba(18,59,104,0.06)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#526174]">
                    {stat.label}
                  </p>

                  <div className="mt-3">
                    {loading ? (
                      <div className="h-9 w-12 animate-pulse rounded-lg bg-[#EEF3F7]" />
                    ) : (
                      <p className="text-3xl font-semibold tracking-tight text-[#172033]">
                        {value}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68] transition-colors group-hover:bg-[#123B68] group-hover:text-white">
                  <Icon size={20} strokeWidth={1.7} />
                </div>
              </div>

              <p className="mt-4 text-sm text-[#8A98AA]">
                {stat.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}