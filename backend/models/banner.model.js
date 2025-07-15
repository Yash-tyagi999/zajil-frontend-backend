import mongoose from "mongoose";
import Counter from "./counter.model.js";

const bannerSchema = new mongoose.Schema(
  {
    bannerId: {
      type: Number,
      unique: true,
    },
    bannerTitle: { type: String, required: true },

    bannerImageUrl: {
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

bannerSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "banner_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.bannerId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
