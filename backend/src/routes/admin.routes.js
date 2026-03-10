import { Router } from "express";
import jwt from "jsonwebtoken";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { ChatbotLead } from "../models/ChatbotLead.js";
import { TrainingRegistration } from "../models/TrainingRegistration.js";

const router = Router();

router.post("/login", async (req, res) => {
  const key = String(req.body?.key ?? "");
  const configured = process.env.ADMIN_KEY;
  if (!configured) {
    return res.status(500).json({ error: true, message: "ADMIN_KEY is not configured on the server" });
  }
  if (!key || key !== configured) {
    return res.status(401).json({ error: true, message: "Invalid admin key" });
  }

  const secret = process.env.ADMIN_JWT_SECRET || configured;
  const token = jwt.sign({ role: "admin" }, secret, { expiresIn: "7d" });

  res.cookie("av_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ ok: true });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("av_admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ ok: true });
});

router.get("/me", requireAdminAuth, async (req, res) => {
  res.json({ ok: true, admin: { role: "admin" } });
});

router.get("/contacts", requireAdminAuth, async (req, res, next) => {
  try {
    const items = await ContactMessage.find().sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

router.get("/trainings", requireAdminAuth, async (req, res, next) => {
  try {
    const items = await TrainingRegistration.find().sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

router.get("/leads", requireAdminAuth, async (req, res, next) => {
  try {
    const items = await ChatbotLead.find().sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

export default router;

