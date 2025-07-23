import express from "express";
import {
  createSubadmin,
  getSubadmins,
  updateSubadminStatus,
} from "../controllers/subadmin.controller.js";

const router = express.Router();

router.post("/createsubadmin", createSubadmin);
router.get("/getsubadmins", getSubadmins);
router.patch("/updatesubadminstatus", updateSubadminStatus);

export default router;
