import express from "express";
import {
  createRole,
  getRole,
  getRoles,
  updateRole,
  updateRoleStatus,
} from "../controllers/role.controller.js";

const router = express.Router();

router.post("/createrole", createRole);
router.get("/getroles", getRoles);
router.patch("/updaterolestatus", updateRoleStatus);
router.get("/getrole/:roleId", getRole);
router.patch("/updaterole", updateRole);

export default router;
