const errorHandler = (err, req, res, _next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({
      message: `Duplicate value for ${field}: ${err.keyValue[field]}`,
    });
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
};

export default errorHandler;
