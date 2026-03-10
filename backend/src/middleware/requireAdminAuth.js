import jwt from "jsonwebtoken";

export function requireAdminAuth(req, res, next) {
  const token = req.cookies?.av_admin;
  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_KEY;
  if (!secret) {
    return res.status(500).json({ error: true, message: "Admin auth is not configured" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded?.role || decoded.role !== "admin") {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }
}

