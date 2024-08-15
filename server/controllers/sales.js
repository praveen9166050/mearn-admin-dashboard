import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res, next) => {
  try {
    const overallStats = await OverallStat.find({});
    res.status(200).json({
      success: true,
      overallStats: overallStats[0]
    });
  } catch (error) {
    next(error);
  }
}