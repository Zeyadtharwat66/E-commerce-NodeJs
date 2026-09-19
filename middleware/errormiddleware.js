const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.status = "fail";
    err.message = "Invalid resource id";
  }

  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.status = "fail";
  }

  if (err.code === 11000) {
    err.statusCode = 409;
    err.status = "fail";
    err.message = "A category with this name already exists";
  }

  if (process.env.NODE_ENV === "development") {
    return sendErrorForDev(err, res);
  }

  return sendErrorForProd(err, res);
};

module.exports = globalError;
