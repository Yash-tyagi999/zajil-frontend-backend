import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { user_name, email, password, phone_number, address } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        error: "User already exists with the provided email address.",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: user_name,
      email,
      password: hashedPass,
      phoneNumber: phone_number,
      address,
    });
    await newUser.save();
    return res.status(201).json({ message: "signup Successful", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in signup controller" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({ message: "All Users Data", users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Get Users Data controller" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = status;
    await user.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Update User Status controller" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User Data", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Get User Data controller" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      orderPackageType,
      orderPickupAddress,
      orderPickupBranch,
      orderShipmentWeight,
      orderShipmentUnit,
      orderReceiverName,
      orderReceiverNumber,
      orderReceiverCity,
      orderReceiverAddress,
      noOfBoxes,
      orderCancellationReason,
      orderItemDescription,
    } = req.body;

    const userId = req.headers["userid"];

    const sender = await User.findOne({ userId: userId });

    if (!sender) {
      return res.status(409).json({ message: "Sender Details Not Found" });
    }

    const newOrder = new Order({
      orderPackageType,
      orderPickupAddress,
      orderPickupBranch,
      orderShipmentWeight,
      orderShipmentUnit,
      orderEstimateDeliveryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      orderReceiverName,
      orderReceiverNumber,
      orderReceiverCity,
      orderReceiverAddress,
      orderSenderId: userId,
      orderSenderName: sender.name,
      orderSenderNumber: sender.phoneNumber,
      orderSenderAddress: sender.address,
      orderPickupDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      noOfBoxes,
      orderItemDescription,
      orderDeliveredDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      orderCancellationReason,
      orderCancellationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    await newOrder.save();
    return res.status(201).json({ message: "Order Created Successfully" });
  } catch (error) {
    console.log("Error in create Order Controller", error);
    return res.status(500).json({ message: "Error in CreateOrder controller" });
  }
};
