import Role from "../models/role.model.js";
import Subadmin from "../models/subadmin.model.js";

export const createSubadmin = async (req, res) => {
  try {
    const {
      subadminName,
      subadminCompanyName,
      subadminRoleName,
      subadminEmail,
      subadminPhoneNumber,
      subadminUserName,
      subadminPassword,
      subadminProfileImageUrl,
    } = req.body;

    const subadmin = await Subadmin.findOne({ subadminEmail });

    if (subadmin) {
      return res.status(409).json({
        message: "Sub Admin already exists with the provided email address.",
      });
    }

    const role = await Role.findOne({ roleName: subadminRoleName });
    if (!role) {
      return res.status(409).json({
        message: "Role not found.. Try Again",
      });
    }

    const newSubadmin = new Subadmin({
      subadminName,
      subadminCompanyName,
      subadminRoleId: role._id,
      subadminRoleName,
      subadminEmail,
      subadminPhoneNumber,
      subadminUserName,
      subadminPassword,
      subadminProfileImageUrl,
    });
    await newSubadmin.save();
    return res.status(201).json({ message: "signup Sucessful", newSubadmin });
  } catch (error) {
    console.log("error in subadminSignup controller", error);
    return res
      .status(500)
      .json({ message: "error in subadminSignup controller" });
  }
};

export const getSubadmins = async (req, res) => {
  try {
    const subadmins = await Subadmin.find();

    return res.status(200).json({ message: "All Sub Admins Data", subadmins });
  } catch (error) {
    console.log("Error in getsubadmins controller", error);
    return res
      .status(500)
      .json({ message: "Error in getsubadmins controller" });
  }
};

export const updateSubadminStatus = async (req, res) => {
  try {
    const { subadminId, subadminStatus } = req.body;
    const subadmin = await Subadmin.findOne({ subadminId });
    if (!subadmin) {
      return res.status(404).json({ message: "Sub Admin not found" });
    }
    subadmin.subadminStatus = subadminStatus;
    await subadmin.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log("error in Update subadmin Status controller", error);
    return res
      .status(500)
      .json({ message: "error in Update subadmin Status controller" });
  }
};