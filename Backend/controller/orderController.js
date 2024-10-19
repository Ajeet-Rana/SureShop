const catchAsyncError = require("../Middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// Get single user Order Details

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) return next(new errorHandler("No order found with this id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged user item
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  let TotalAmount = 0;
  orders.forEach((order) => {
    TotalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    TotalAmount,
  });
});

// Update Order Status --Admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new errorHandler("Your Order doesn't exits", 404));

  if (order.orderStatus === "Delivered") {
    return next(new errorHandler("You have already delivered the order", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new errorHandler("Your Order doesn't exits", 404));
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
