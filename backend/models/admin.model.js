import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, require: true },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    default: "",
  },
  otpTimer: {
    type: Number,
  },
});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
