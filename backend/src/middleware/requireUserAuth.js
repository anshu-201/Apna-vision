import { verifyAuthToken } from "../utils/authTokens.js";

export function requireUserAuth(allowedRoles = []) {
  return (req, res, next) => {
    const token = req.cookies?.av_auth;
    if (!token) return res.status(401).json({ error: true, message: "Unauthorized" });

    try {
      const decoded = verifyAuthToken(token);
      if (!decoded?.userId || !decoded?.role) {
        return res.status(401).json({ error: true, message: "Unauthorized" });
      }
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: true, message: "Forbidden" });
      }
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }
  };
}

