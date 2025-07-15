import mongoose from "mongoose";
import Counter from "./counter.model.js";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: Number,
      unique: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleCapacity: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleImageUrl: {
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

vehicleSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "vehicle_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.vehicleId = counter.seq +23000;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
