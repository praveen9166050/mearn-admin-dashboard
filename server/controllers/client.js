import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const productsWithStats = await Promise.all(products.map(async product => {
      const stat = await ProductStat.findOne({productId: product._id});
      return {
        ...product._doc,
        stat
      };
    }))
    res.status(200).json({
      success: true,
      productsWithStats
    });
  } catch (error) {
    next(error);
  }
}

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({role: "user"}).select("-password");
    res.status(200).json({
      success: true,
      customers
    });
  } catch (error) {
    next(error);
  }
}