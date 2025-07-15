import Admin from "../models/admin.js";

export const protect_admin_route = async (req, res, next) => {
  try {
    const { userId } = req.headers;
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in auth middleware" });
  }
};