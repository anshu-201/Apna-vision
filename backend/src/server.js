import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./utils/connectDb.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import healthRoutes from "./routes/health.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import trainingRoutes from "./routes/training.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",").map((s) => s.trim()) ?? true,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    name: "Apna Vision API",
    status: "ok"
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 8080);

await connectDb(process.env.MONGODB_URI);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${port}`);
});

