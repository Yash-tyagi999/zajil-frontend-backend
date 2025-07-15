import mongoose from "mongoose";
import Counter from "./counter.model.js";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
    },
    orderPackageType: {
      type: String,
    },
    orderNoOfBoxes: {
      type: Number,
    },
    orderItemDescription: {
      type: String,
    },
    orderSenderId: {
      type: Number,
    },
    orderSenderName: {
      type: String,
      required: true,
    },
    orderSenderNumber: {
      type: String,
      required: true,
    },
    orderSenderAddress: {
      type: String,
      required: true,
    },
    orderPickupAddress: {
      type: String,
      required: true,
    },
    orderPickupBranch: {
      type: String,
      required: true,
    },
    orderShipmentWeight: {
      type: Number,
    },
    orderShipmentUnit: {
      type: String,
      enum: ["kg", "g", "lb"],
      default: "kg",
    },
    orderStatus: {
      type: String,
      default: "Processing",
      enum: [
        "Processing",
        "Shipped",
        "Picked Up",
        "Pickup Delivered",
        "Reattempt Pickup",
        "Reattempt Delivery",
        "Canceled",
      ],
    },
    orderEstimateDeliveryDate: {
      type: Date,
    },
    orderPickupDate: {
      type: Date,
    },
    orderDeliveredDate: {
      type: Date,
    },
    orderCancellationDate: {
      type: Date,
    },
    orderCancellationReason: {
      type: String,
    },
    orderReceiverName: {
      type: String,
      required: true,
    },
    orderReceiverNumber: {
      type: String,
      required: true,
    },
    orderReceiverCity: {
      type: String,
      required: true,
    },
    orderReceiverAddress: {
      type: String,
      required: true,
    },
    orderPaymentBookingPrice: {
      type: Number,
    },
    orderPaymentDiscountedPrice: {
      type: Number,
    },
    orderPaymentPromocodeApplied: {
      type: String,
    },
    orderPaymentTransactionId: {
      type: String,
    },
    orderPaymentPaymentDateTime: {
      type: Date,
    },
    orderPaymentPaymentMethod: {
      type: String,
      enum: ["Card", "Cash", "UPI", "NetBanking", "Wallet"],
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "order_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.orderId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
