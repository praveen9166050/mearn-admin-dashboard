import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
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
export const getTransactions = async (req, res, next) => {
  try {
    const {page = 1, pageSize = 20, sort = null, search = ""} = req.query;
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1
      }
      return sortFormatted;
    }
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const transactions = await Transaction.find({
      $or: [
        {cost: {$regex: new RegExp(search, 'i')}},
        {userId: {$regex: new RegExp(search, 'i')}}
      ]
    }).sort(sortFormatted).skip(page * pageSize).limit(pageSize);
    const total = await Transaction.countDocuments({
      $or: [
        {cost: {$regex: new RegExp(search, 'i')}},
        {userId: {$regex: new RegExp(search, 'i')}}
      ]
    });
    res.status(200).json({
      success: true,
      transactions,
      total
    });
  } catch (error) {
    next(error);
  }
}