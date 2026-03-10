export function notFoundHandler(req, res) {
  res.status(404).json({
    error: true,
    message: "Route not found"
  });
}

