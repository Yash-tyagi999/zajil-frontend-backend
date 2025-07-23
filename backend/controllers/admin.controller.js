import bcrypt from "bcryptjs";
import crypto from "crypto";

import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { genToken } from "../utils/token.js";
import Subadmin from "../models/subadmin.model.js";
import Role from "../models/role.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(409).json({
        error: "Admin already exists with the provided email address.",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPass,
    });
    await newAdmin.save();
    return res.status(201).json({ message: "signup Sucessful", newAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in signup controller" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    let roleType = "admin";

    if (!admin) {
      // If not admin, check Subadmins
      admin = await Subadmin.findOne({ email });
      roleType = "subadmin";
    }

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials, please check email and password",
      });
    }
    let verify = await bcrypt.compare(password, admin.password);
    if (!verify) {
      return res.status(401).json({
        message: "Invalid credentials, please check email and password",
      });
    }
    genToken(res, admin, roleType);
    let roleData = {};

    if (roleType === "subadmin") {
      const role = await Role.findById(admin.subadminRoleId);
      roleData = {
        roleName: admin.subadminRoleName,
        roleId: admin.subadminRoleId,
        moduleAccess: role?.moduleName || [],
      };
    }

    return res.status(200).json({
      message: `${
        roleType === "admin" ? "Admin" : "Subadmin"
      } login successfully`,
      admin: {
        id: admin._id,
        email: admin.email || admin.subadminEmail,
        roleType,
        ...roleData,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in login controller" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    const otp = crypto.randomInt(100000, 999999);
    const otpTimer = new Date().getTime() + 10 * 60 * 1000;

    admin.otp = otp;
    admin.otpTimer = otpTimer;
    await admin.save();
    const token = jwt.sign({ id: admin._id }, process.env.JWT_KEY, {
      expiresIn: "10m",
    });
    res.cookie("verify", token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "OTP sent sucessfully, OTP will expire in 10 min",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in forgot password controller" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otpcode } = req.body;
    const admin = await Admin.findOne({ otp: otpcode });
    if (!admin) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    if (admin.otpTimer < new Date().getTime()) {
      return res.status(401).json({ message: "OTP expired, resend OTP" });
    }
    return res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in forgot verify OTP controller" });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const token = req.cookies.verify;
    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Session Timeout, Verify Email Again" });
    }
    const userId = jwt.verify(token, process.env.JWT_KEY).id;

    const admin = await Admin.findById(userId);
    if (!admin) {
      return res
        .status(401)
        .json({ message: "User not Found, Verify Email Again" });
    }

    const otp = crypto.randomInt(100000, 999999);
    const otpTimer = new Date().getTime() + 10 * 60 * 10000;

    admin.otp = otp;
    admin.otpTimer = otpTimer;
    await admin.save();
    return res.status(200).json({
      message: "OTP sent sucessfully, OTP will expire in 10 min",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in forgot resend OTP controller" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.cookies.verify;
    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Session Timeout, Verify Email Again" });
    }
    const userId = jwt.verify(token, process.env.JWT_KEY).id;
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res
        .status(401)
        .json({ message: "User not Found, Verify Email Again" });
    }

    const { password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
    admin.password = hashedPass;
    await admin.save();
    return res.status(200).json({
      message: "Password updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in forgot reset OTP controller" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in forgot logout controller" });
  }
};
