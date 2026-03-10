export function requireAdminKey(req, res, next) {
  const configured = process.env.ADMIN_KEY;
  if (!configured) {
    return res.status(500).json({
      error: true,
      message: "ADMIN_KEY is not configured on the server"
    });
  }

  const provided = req.header("x-admin-key");
  if (!provided || provided !== configured) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized"
    });
  }

  next();
}

