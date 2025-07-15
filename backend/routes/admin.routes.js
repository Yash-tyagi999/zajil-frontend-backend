import express from "express";

import { forgotPassword, login, logout, resendOTP, resetPassword, signup, verifyOTP } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyotp", verifyOTP);
router.post("/resendotp", resendOTP);
router.post("/resetpassword", resetPassword);
router.post("/logout", logout);

export default router;