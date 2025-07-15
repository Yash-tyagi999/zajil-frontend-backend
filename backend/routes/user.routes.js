import express from "express";
import {
  getUser,
  getUsers,
  signup,
  updateStatus,
  createOrder,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/getusers", getUsers);
router.patch("/updatestatus", updateStatus);
router.get("/getuser/:userId", getUser);
router.post("/createorder", createOrder);

export default router;
