import {
  getVisitStatsService,
  recordVisitService,
} from "../services/visit.service.js";

export const recordVisit = async (req, res) => {
  try {
    const { visitorId } = req.body;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID is required.",
      });
    }

    const visit = await recordVisitService(visitorId);

    return res.status(201).json({
      success: true,
      message: "Visit recorded successfully.",
      data: visit,
    });
  } catch (error) {
    console.error("Record visit error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record visit.",
    });
  }
};

export const getVisitStats = async (req, res) => {
  try {
    const stats = await getVisitStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get visit stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch visit statistics.",
    });
  }
};