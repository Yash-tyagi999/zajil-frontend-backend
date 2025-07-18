import mongoose from "mongoose";
import Counter from "./counter.model.js";

const roleSchema = new mongoose.Schema(
  {
    roleId: {
      type: Number,
      unique: true,
    },
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    moduleName: [
      {
        name: {
          type: String,
          required: true,
        },
        read: {
          type: Boolean,
          default: true,
          required: true,
        },
        fullAccess: {
          type: Boolean,
          default: true,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Delete"],
    },
  },
  { timestamps: true }
);

roleSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "role_serial" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.roleId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
