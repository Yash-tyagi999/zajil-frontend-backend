import mongoose from "mongoose";
import Counter from "./counter.model.js";

const riderSchema = new mongoose.Schema(
  {
    riderType: {
      type: String,
      required: true,
      enum: ["Freelancer", "Under Company"],
    },
    riderCompany: { type: String },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      unique: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Delete"],
    },
    documentIdNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    bankNumber: {
      type: String,
      required: true,
    },
    bankAccountHolderName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

riderSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "rider_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userId = counter.seq + 1000;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Rider = mongoose.model("Rider", riderSchema);
export default Rider;
