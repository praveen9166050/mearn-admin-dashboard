import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema(
  {
    productId: {
      type: String
    },
    yearlySalesTotal: {
      type: Number
    },
    yearlyTotalSoldUnits: {
      type: Number
    },
    year: {
      type: Number
    },
    monthlyData: [
      {
        month: {
          type: String
        },
        totalSales: {
          type: Number
        },
        totalUnits: {
          type: Number
        }
      }
    ],
    dailyData: [
      {
        date: {
          type: String
        },
        totalSales: {
          type: Number
        },
        totalUnits: {
          type: Number
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const ProductStat = mongoose.model('ProductStat', productStatSchema);

export default ProductStat;