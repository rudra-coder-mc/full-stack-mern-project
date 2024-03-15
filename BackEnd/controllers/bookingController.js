const booking = require("../models/bookingModel");
const ErrorHander = require("../utility/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Appointment = require("../models/bookingModel");
const ApiFeatures = require("../utility/apifetures");

//Create booking
exports.createBooking = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  const booking = await Appointment.create(req.body);

  res.status(201).json({
    success: true,
    booking,
  });
});

//Delete Booking
exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
    const booking = await Appointment.findById(req.params.id);
  
    if (!booking) {
      return next(new ErrorHander("service not found", 404));
    }
    await booking.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "booking successfully cancelled",
    });
  });

  //get all services
exports.getAllBooking = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const bookingCount = await Appointment.countDocuments();

  const apiFeature = new ApiFeatures(Appointment.find(), req.query)
    .search()
    .filter();
  const bookings = await apiFeature.query;
  let filteredServicesCount = bookings.length;

  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    bookings,
    bookingCount,
    resultPerPage,
    filteredServicesCount,
  });
});