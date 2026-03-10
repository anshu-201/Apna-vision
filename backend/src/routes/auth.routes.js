import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { signAuthToken } from "../utils/authTokens.js";
import { requireUserAuth } from "../middleware/requireUserAuth.js";

const router = Router();

function setAuthCookie(res, token) {
  res.cookie("av_auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

router.post("/register", async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: true, message: "Invalid data", details: parsed.error.flatten() });
    }

    const { name, email, password, role } = parsed.data;

    const exists = await User.findOne({ email }).lean();
    if (exists) return res.status(409).json({ error: true, message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });

    const token = signAuthToken({ userId: String(user._id), role: user.role, name: user.name, email: user.email });
    setAuthCookie(res, token);
    res.status(201).json({ ok: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: true, message: "Invalid data", details: parsed.error.flatten() });
    }

    const { email, password, role } = parsed.data;

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(401).json({ error: true, message: "Invalid credentials" });
    if (user.role !== role) return res.status(401).json({ error: true, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: true, message: "Invalid credentials" });

    const token = signAuthToken({ userId: String(user._id), role: user.role, name: user.name, email: user.email });
    setAuthCookie(res, token);
    res.json({ ok: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("av_auth", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ ok: true });
});

router.get("/me", requireUserAuth(), async (req, res) => {
  res.json({ ok: true, user: { id: req.user.userId, role: req.user.role, name: req.user.name, email: req.user.email } });
});

export default router;

