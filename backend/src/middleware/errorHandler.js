export function errorHandler(err, req, res, next) {
  const status = Number(err?.status ?? 500);
  const message = err?.message ?? "Server error";

  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    error: true,
    message
  });
}

