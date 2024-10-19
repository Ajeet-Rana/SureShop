const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // Wrong MogoDB Id

  if (err.name == "CastError") {
    const message = `Resource not found INVALID: ${err.path}`;
    err = new errorHandler(message, 404);
  }
  //  Duplicate Error
  if (err.code === 11000) {
    const message = `Duplicate Email Entered`;
    err = new errorHandler(message, 400);
  }

  // JWT expires error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new errorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web Token is invalid, Try again`;
    err = new errorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
