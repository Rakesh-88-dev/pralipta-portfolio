import {
  BriefcaseBusiness,
  GraduationCap,
  FolderKanban,
  UserRound,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Profile information is available",
    description: "Review your professional profile details.",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Education record is available",
    description: "Your education section contains 1 record.",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Experience record is available",
    description: "Your experience section contains 1 record.",
    icon: BriefcaseBusiness,
  },
  {
    id: 4,
    title: "Project record is available",
    description: "Your projects section contains 1 record.",
    icon: FolderKanban,
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-[0_3px_14px_rgba(18,59,104,0.035)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7EA8D8]">
            Overview
          </p>

          <h2 className="mt-1 text-xl font-semibold text-[#172033]">
            Recent Activity
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-[#F7F9FC]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1F8] text-[#123B68]">
                <Icon size={18} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#172033]">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-[#7A8798]">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}