import express from "express";
import { getRider, getRiders, signup, updateStatus } from "../controllers/rider.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/getriders", getRiders);
router.patch("/updatestatus", updateStatus);
router.get("/getrider/:userId", getRider)


export default router;