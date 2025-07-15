import mongoose from "mongoose";
import Counter from "./counter.model.js";

const branchSchema = new mongoose.Schema(
  {
    branchId: {
      type: Number,
      unique: true,
    },
    name: { type: String, required: true },

    city: {
      type: String,
      required: true,
    },

    location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: [{ type: Number, index: "2dsphere" }],
    },

    businessHours: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },

    weekdaysShift: {
      monday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
      tuesday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
      wednesday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
      thursday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
      friday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
      saturday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
      sunday: {
        morning: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "08:00" },
          end: { type: String, default: "11:30" },
        },
        evening: {
          enabled: { type: Boolean, default: false },
          start: { type: String, default: "11:31" },
          end: { type: String, default: "21:30" },
        },
      },
    },
    status: {
      type: String,
      default: "Open",
      enum: ["Open", "Close"],
    },
  },
  { timestamps: true }
);

branchSchema.index({ location: "2dsphere" });

branchSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "branch_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.branchId = counter.seq + 23000;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
