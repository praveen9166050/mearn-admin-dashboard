import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
}

export const getDashboardStats = async (req, res, next) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear= 2021;
    const currentDay = "2021-11-15";

    // recent transactions
    const transactions = await Transaction.find({}).limit(50).sort({createdOn: -1});

    // overall stats
    const overallStats = await OverallStat.find({year: currentYear});

    const {totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory} = overallStats[0];
    
    const thisMonthStats = overallStats[0].monthlyData.find(({month}) => month === currentMonth);
    const todayStats = overallStats[0].dailyData.find(({date}) => date === currentDay);
    
    res.status(200).json({
      success: true,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions
    });
  } catch (error) {
    next(error);
  }
}