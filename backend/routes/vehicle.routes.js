import express from "express";
import {
  createVehicle,
  getVehicles,
  updateVehicle,
  updateVehicleStatus,
} from "../controllers/vehicle.conroller.js";

const router = express.Router();

router.post("/createvehicle", createVehicle);
router.get("/getvehicles", getVehicles);
router.patch("/updatevehiclestatus", updateVehicleStatus);
router.patch("/updateVehicle", updateVehicle);

export default router;
