import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import riderRoutes from "./routes/rider.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import companyRoutes from "./routes/company.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import orderRoutes from "./routes/order.routes.js";
import roleRoutes from "./routes/role.routes.js";

import uploadRoutes from "./routes/upload.routes.js";

import { connectDb } from "./utils/db.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("hello server");
});

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rider", riderRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/role", roleRoutes);

app.use("/api", uploadRoutes);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`server is running in server ${process.env.PORT}`);
});
