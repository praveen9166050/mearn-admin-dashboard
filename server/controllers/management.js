import User from "../models/User.js";

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