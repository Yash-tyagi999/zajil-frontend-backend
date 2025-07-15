import express from "express";

import {
  createBranch,
  getBranches,
  updateStatus,
  updateWeekdaysShift,
} from "../controllers/branch.controller.js";

const router = express.Router();

router.post("/createbranch", createBranch);
router.get("/getbranches", getBranches);
router.patch("/updatestatus", updateStatus);
router.patch("/updateweekdaysshift", updateWeekdaysShift);

export default router;
