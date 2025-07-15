import Rider from "../models/rider.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const {
      rider_type,
      rider_company,
      user_name,
      email,
      password,
      phone_number,
      address,
      city,
      document_id_number,
      bank_name,
      bank_number,
      bank_account_holder_name,
    } = req.body;

    const rider = await Rider.findOne({ email });
    if (rider) {
      return res.status(409).json({
        error: "Rider already exists with the provided email address.",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newRider = new Rider({
      riderType: rider_type,
      riderCompany: rider_company,
      name: user_name,
      email,
      password: hashedPass,
      phoneNumber: phone_number,
      address,
      city,
      documentIdNumber: document_id_number,
      bankName: bank_name,
      bankNumber: bank_number,
      bankAccountHolderName: bank_account_holder_name,
    });
    await newRider.save();
    return res.status(201).json({ message: "signup Sucessful", newRider });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in signup controller" });
  }
};

export const getRiders = async (req, res) => {
  try {
    const riders = await Rider.find().select("-password");

    return res.status(200).json({ message: "All Riders Data", riders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Get Riders Data controller" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const rider = await Rider.findOne({ userId });
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    rider.status = status;
    await rider.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Update rider Status controller" });
  }
};

export const getRider = async (req, res) => {
  try {
    const { userId } = req.params;
    const rider = await Rider.findOne({ userId });
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    return res.status(200).json({ message: "Rider Data", rider });
  } catch (error) {
    console.log("Error in Get User Data controller", error);
    return res.status(500).json({ message: "Error in GetUserData controller" });
  }
};
