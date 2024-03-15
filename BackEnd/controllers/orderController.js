const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utility/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utility/apifetures");

//Create order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log(shippingInfo);

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

//Get Single Product
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHander(`Order not found with this id`, 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//Get logged in user order
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all order --Admin
exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalAmount;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
//update order status order --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already devlivered this order", 400));
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  //   await order.save({ validateBeforeSave: false });
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock = quantity;
  product.save({ validateBeforeSave: false });
}

//delete order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this id", 404));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
