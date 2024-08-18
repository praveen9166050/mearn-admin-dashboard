import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({role: "admin"}).select("-password");
    res.status(200).json({
      success: true,
      admins
    });
  } catch (error) {
    next(error);
  }
}

export const getUserPerformance = async (req, res, next) => {
  try {
    const {id} = req.params;
    const userWithStats = await User.aggregate([
      {
        $match: {_id: new mongoose.Types.ObjectId(id)}
      },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats'
        }
      },
      {
        $unwind: '$affiliateStats'
      }
    ]);
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(transaction => transaction !== null);
    res.status(200).json({
      success: true,
      user: userWithStats,
      sales: filteredSaleTransactions
    });
  } catch (error) {
    next(error);
  }
}