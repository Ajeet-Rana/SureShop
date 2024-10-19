const catchAsyncError = require("./catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(new errorHandler("Login to access the resource"), 401);

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(
          `Role: ${req.user.role} are not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
