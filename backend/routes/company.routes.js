import express from "express";

import {
  createCompany,
  getCompanies,
  updateCompany,
  updateCompanyStatus,
} from "../controllers/company.controller.js";
const router = express.Router();

router.post("/createcompany", createCompany);
router.get("/getcompanies", getCompanies);
router.patch("/updatecompanystatus", updateCompanyStatus);
router.patch("/updatecompany", updateCompany);

export default router;
