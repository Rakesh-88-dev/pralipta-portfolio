import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getVisitStats } from "../../services/visitorService";

const rangeOptions = [
  {
    key: "week",
    label: "Week",
  },
  {
    key: "month",
    label: "Month",
  },
  {
    key: "year",
    label: "Year",
  },
];

const formatLabel = (label, range) => {
  if (!label) return "";

  if (range === "year") {
    const [year, month] = label.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      1
    ).toLocaleDateString("en-US", {
      month: "short",
    });
  }

  const [, month, day] = label.split("-");

  return new Date(
    2026,
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function VisitorAnalytics() {
  const [range, setRange] = useState("week");
  const [visitStats, setVisitStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVisitStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getVisitStats();

        setVisitStats(data || {});
      } catch (error) {
        console.error("Failed to load visitor analytics:", error);

        setError("Unable to load visitor analytics.");
      } finally {
        setLoading(false);
      }
    };

    loadVisitStats();
  }, []);

  const chartData = useMemo(() => {
    const data = visitStats?.[range];

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      ...item,
      displayLabel: formatLabel(item.label, range),
    }));
  }, [visitStats, range]);

  const totalForRange = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + Number(item.visits || 0),
      0
    );
  }, [chartData]);

  return (
    <section className="mb-7 rounded-2xl border border-[#E3EAF2] bg-white p-5 shadow-[0_3px_14px_rgba(18,59,104,0.035)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7EA8D8]">
            Website analytics
          </p>

          <div className="mt-1 flex flex-wrap items-baseline gap-3">
            <h2 className="text-[19px] font-semibold tracking-[-0.015em] text-[#172033]">
              Visitor activity
            </h2>

            {!loading && !error && (
              <span className="text-sm text-[#8996A8]">
                {totalForRange} visits
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-[#8996A8]">
            Track portfolio visits over time.
          </p>
        </div>

        <div className="flex w-fit items-center rounded-xl border border-[#E3EAF2] bg-[#F8FAFD] p-1">
          {rangeOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setRange(option.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                range === option.key
                  ? "bg-white text-[#123B68] shadow-sm"
                  : "text-[#8996A8] hover:text-[#526174]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-[300px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E3EAF2] border-t-[#123B68]" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-[#172033]">
                Analytics unavailable
              </p>

              <p className="mt-1 text-sm text-[#8996A8]">
                {error}
              </p>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-[#172033]">
                No visitor data yet
              </p>

              <p className="mt-1 text-sm text-[#8996A8]">
                Visit activity will appear here once visitors arrive.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 8,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="visitorGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#123B68"
                    stopOpacity={0.18}
                  />
                  <stop
                    offset="100%"
                    stopColor="#123B68"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#EEF2F6"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="displayLabel"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#8996A8",
                  fontSize: 11,
                }}
                dy={10}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#8996A8",
                  fontSize: 11,
                }}
                width={35}
              />

              <Tooltip
                cursor={{
                  stroke: "#D8E2EC",
                  strokeWidth: 1,
                }}
                contentStyle={{
                  border: "1px solid #E3EAF2",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  boxShadow: "0 8px 25px rgba(18, 59, 104, 0.10)",
                  fontSize: "12px",
                }}
                labelStyle={{
                  color: "#526174",
                  marginBottom: "4px",
                }}
                formatter={(value) => [`${value}`, "Visits"]}
              />

              <Area
                type="monotone"
                dataKey="visits"
                stroke="#123B68"
                strokeWidth={2.5}
                fill="url(#visitorGradient)"
                dot={{
                  r: 3,
                  fill: "#FFFFFF",
                  stroke: "#123B68",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: "#123B68",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}