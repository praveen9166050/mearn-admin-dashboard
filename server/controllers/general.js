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