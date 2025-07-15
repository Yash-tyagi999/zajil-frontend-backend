import express from "express";
import {
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/getorders", getOrders);
router.patch("/updateorderstatus", updateOrderStatus);
router.get("/getorder/:orderId", getOrder);

export default router;
