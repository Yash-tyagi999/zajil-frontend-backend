import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({ message: "All orders Data", orders });
  } catch (error) {
    console.log("Error in getOrders controller", error);
    return res.status(500).json({ message: "Error in getOrders controller" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log("Error in updateOrderStatus controller", error);
    return res
      .status(500)
      .json({ message: "Error in updateOrderStatus controller" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order Data", order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Get Order Data controller" });
  }
};