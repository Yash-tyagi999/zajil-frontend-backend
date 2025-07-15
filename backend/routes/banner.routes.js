import express from "express";

import {
  createBanner,
  getBanners,
  updateBanner,
  updateStatus,
} from "../controllers/banner.controller.js";

const router = express.Router();

router.post("/createbanner", createBanner);
router.get("/getbanners", getBanners);
router.patch("/updatestatus", updateStatus);
router.patch("/updatebanner", updateBanner);

export default router;