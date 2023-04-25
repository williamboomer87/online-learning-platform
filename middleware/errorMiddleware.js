function errorMiddleware(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}

module.exports = errorMiddleware;
