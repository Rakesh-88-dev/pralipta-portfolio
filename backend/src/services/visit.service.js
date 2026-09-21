import Visit from "../models/Visit.js";

export const recordVisitService = async (visitorId) => {
  if (!visitorId) {
    throw new Error("Visitor ID is required.");
  }

  const visit = await Visit.create({
    visitorId,
  });

  return visit;
};

const getDateRange = (range) => {
  const now = new Date();

  if (range === "week") {
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    return {
      start,
      groupFormat: "%Y-%m-%d",
    };
  }

  if (range === "month") {
    const start = new Date(now);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    return {
      start,
      groupFormat: "%Y-%m-%d",
    };
  }

  if (range === "year") {
    const start = new Date(now);
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);

    return {
      start,
      groupFormat: "%Y-%m",
    };
  }

  return null;
};

const getVisitAnalytics = async (range) => {
  const dateRange = getDateRange(range);

  if (!dateRange) {
    throw new Error("Invalid analytics range.");
  }

  const analytics = await Visit.aggregate([
    {
      $match: {
        visitedAt: {
          $gte: dateRange.start,
          $lte: new Date(),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: dateRange.groupFormat,
            date: "$visitedAt",
          },
        },
        visits: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return analytics.map((item) => ({
    label: item._id,
    visits: item.visits,
  }));
};

export const getVisitStatsService = async () => {
  const totalVisits = await Visit.countDocuments();

  const uniqueVisitors = await Visit.distinct("visitorId");

  const [week, month, year] = await Promise.all([
    getVisitAnalytics("week"),
    getVisitAnalytics("month"),
    getVisitAnalytics("year"),
  ]);

  return {
    totalVisits,
    uniqueVisitors: uniqueVisitors.length,
    week,
    month,
    year,
  };
};