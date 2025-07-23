import mongoose from "mongoose";
import Counter from "./counter.model.js";

const subadminSchema = new mongoose.Schema(
  {
    subadminId: {
      type: Number,
      unique: true,
    },
    subadminName: {
      type: String,
      required: true,
    },
    subadminCompanyName: {
      type: String,
    },
    subadminRoleName: {
      type: String,
      required: true,
    },
    subadminRoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    subadminEmail: {
      type: String,
      required: true,
      unique: true,
    },
    subadminPhoneNumber: {
      type: String,
      required: true,
    },
    subadminUserName: {
      type: String,
      required: true,
    },
    subadminPassword: {
      type: String,
      required: true,
    },
    subadminProfileImageUrl: {
      type: String,
    },
    subadminOTP: {
      type: String,
      default: "",
    },
    subadminOTPTimer: {
      type: Number,
    },
    subadminStatus: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Delete"],
    },
  },
  { timestamps: true }
);

subadminSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "subadmin_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.subadminId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
const Subadmin = mongoose.model("Subadmin", subadminSchema, "subadmins");
export default Subadmin;
