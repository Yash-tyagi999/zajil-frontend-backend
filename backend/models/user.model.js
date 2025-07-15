import mongoose from "mongoose";
import Counter from "./counter.model.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "user_serial" },
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

const User = mongoose.model("User", userSchema);
export default User;
