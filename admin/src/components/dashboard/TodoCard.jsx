import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, ListChecks } from "lucide-react";
import { getProfile } from "../../services/profileService";
import { getEducation } from "../../services/educationService";
import { getExperience } from "../../services/experienceService";
import { getProjects } from "../../services/projectService";
import { getSkills } from "../../services/skillService";
import { getCertifications } from "../../services/certificationService";

export default function TodoCard() {
  const [data, setData] = useState({
    profile: null,
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodoData = async () => {
      try {
        const [
          profile,
          education,
          experience,
          projects,
          skills,
          certifications,
        ] = await Promise.all([
          getProfile(),
          getEducation(),
          getExperience(),
          getProjects(),
          getSkills(),
          getCertifications(),
        ]);

        setData({
          profile,
          education: Array.isArray(education) ? education : [],
          experience: Array.isArray(experience) ? experience : [],
          projects: Array.isArray(projects) ? projects : [],
          skills: Array.isArray(skills) ? skills : [],
          certifications: Array.isArray(certifications)
            ? certifications
            : [],
        });
      } catch (error) {
        console.error("Failed to load dashboard to-do data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodoData();
  }, []);

  const todos = useMemo(() => {
    const profileComplete =
      Boolean(data.profile?.name) &&
      Boolean(data.profile?.title) &&
      Boolean(data.profile?.bio) &&
      Boolean(data.profile?.email);

    return [
      {
        id: "profile",
        label: "Complete profile",
        completed: profileComplete,
      },
      {
        id: "education",
        label: "Add education",
        completed: data.education.length > 0,
      },
      {
        id: "experience",
        label: "Add experience",
        completed: data.experience.length > 0,
      },
      {
        id: "projects",
        label: "Add project",
        completed: data.projects.length > 0,
      },
      {
        id: "skills",
        label: "Add skills",
        completed: data.skills.length > 0,
      },
      {
        id: "certifications",
        label: "Add certification",
        completed: data.certifications.length > 0,
      },
    ];
  }, [data]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress =
    todos.length > 0
      ? Math.round((completedCount / todos.length) * 100)
      : 0;

  return (
    <section className="rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-[0_8px_30px_rgba(18,59,104,0.04)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FA] text-[#123B68]">
              <ListChecks size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-[#172033]">
                To-Do
              </h2>

              <p className="mt-0.5 text-xs text-[#8996A8]">
                Portfolio completion checklist
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-[#123B68]">
            {loading ? "—" : `${progress}%`}
          </p>

          <p className="text-[11px] text-[#8996A8]">
            complete
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-[#EEF2F6]">
          <div
            className="h-full rounded-full bg-[#123B68] transition-all duration-500"
            style={{ width: `${loading ? 0 : progress}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-[#8996A8]">
          {loading
            ? "Checking your portfolio..."
            : `${completedCount} of ${todos.length} tasks completed`}
        </p>
      </div>

      <div className="mt-5 space-y-1">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-[#F8FAFD]"
          >
            {loading ? (
              <div className="h-5 w-5 animate-pulse rounded-full bg-[#EEF2F6]" />
            ) : todo.completed ? (
              <CheckCircle2
                size={19}
                strokeWidth={1.9}
                className="shrink-0 text-[#2F855A]"
              />
            ) : (
              <Circle
                size={19}
                strokeWidth={1.7}
                className="shrink-0 text-[#B8C2CF]"
              />
            )}

            <span
              className={`text-sm ${
                todo.completed
                  ? "text-[#68768A] line-through"
                  : "font-medium text-[#172033]"
              }`}
            >
              {todo.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}