import mongoose from "mongoose";
import Counter from "./counter.model.js";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyId: {
      type: Number,
      unique: true,
    },
    companyAddress: {
      type: String,
      required: true,
      unique: true,
    },
    companyImageUrl: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Delete"],
    },
  },
  { timestamps: true }
);

companySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "company_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.companyId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Company = mongoose.model("Company", companySchema);
export default Company;
