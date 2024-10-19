const catchAsyncError = require("../Middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const User = require("../Models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
// Registration API
exports.registerUser = catchAsyncError(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// login API

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if the email and password exist
  if (!email || !password)
    return next(new errorHandler("Please Enter the Email and Password", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new errorHandler("Email or Password is Invalid", 401));

  const isPassMatch = await user.comparePassword(password);
  if (!isPassMatch)
    return next(new errorHandler("Email or Password is Invalid", 401));

  const Token = user.getJWTToken();

  sendToken(user, 200, res);
});

// Log out API

exports.userLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forget Password API

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new errorHandler("User Not found", 404));

  // Get Reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset Token is :- \n\n
  ${resetPasswordUrl} \n\nIf you have not requested this email then, please Ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new errorHandler(error.message, 500));
  }
});

// RE-set Password API

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating Hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log(req.body.password, req.body.confirmPassword);

  if (!user)
    return next(new errorHandler("Reset Token is invalid or expired", 400));
  if (req.body.password !== req.body.confirmPassword) {
    return next(new errorHandler("Password Does not Match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user's PASSWORD

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const ispasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!ispasswordMatched)
    return next(new errorHandler("Your old password is incorrect", 404));

  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new errorHandler("Your password doesn't match", 400));

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update user's Name and Email

exports.updateDetails = catchAsyncError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// Get All User's --Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new errorHandler("No user exist", 401));
  res.status(200).json({
    success: true,
    users,
  });
});

// Get A Single User --Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new errorHandler(`User with ID : ${req.params.id} doesn't exist`, 401)
    );
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user's role -- Admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user)
    return next(
      new errorHandler(`User not exist with id : ${req.params.id}`, 401)
    );
  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new errorHandler(`User not exist with id : ${req.params.id}`, 401)
    );

  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User Delete Successfully",
  });
});
