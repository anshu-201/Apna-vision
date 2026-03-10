import jwt from "jsonwebtoken";

export function getAuthSecret() {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error("Missing AUTH_JWT_SECRET");
  return secret;
}

export function signAuthToken(payload) {
  return jwt.sign(payload, getAuthSecret(), { expiresIn: "7d" });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, getAuthSecret());
}

