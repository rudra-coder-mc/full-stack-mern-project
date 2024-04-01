const Services = require("../models/serviceModel"); // Assuming your services model is in servicesModel.js
const ErrorHander = require("../utility/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const ApiFeatures = require("../utility/apifetures");

// exports.createService = catchAsyncErrors(async (req, res, next) => {

//   req.body.user = req.user.id;
//   const service = await Services.create(req.body);

//   res.status(201).json({
//     success: true,
//     service,
//   });
// });

exports.createService = catchAsyncErrors(async (req, res, next) => {
  // Configure Cloudinary with your account details
  cloudinary.config({
    cloud_name: "dlc1in1ax",
    api_key: "915151645357372",
    api_secret: "X_6Jckw5QVCWHwfVJgt8yvrgDcI",
  });

  // Validate image presence (adapt as needed for single/multiple image uploads)
  if (!req.files.image) {
    return res
      .status(400)
      .json({ message: "Please select an image to upload." });
  }

  try {
    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        public_id: `${Date.now()}-${req.files.image.name}`, // Set a unique public ID
        resource_type: "auto", // Automatically detect image/video type
      }
    );

    req.body.user = req.user.id;
    console.log(req.body);
    if (!req.body.name || !req.body.description || !req.body.category) {
      return res
        .status(400)
        .json({ message: "Missing required fields in request body." });
    }

    const imageData = {
      url: uploadResult.secure_url, // Use the secure image URL provided by Cloudinary
    };

    // Save image information and other product details to MongoDB
    const service = await Services.create({
      name: req.body.name,
      description: req.body.description,
      image: [imageData],
      category: req.body.category,
      numOfReviews: null,
      reviews: [],
    });

    res.status(201).json({
      success: true,
      service,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error not appointed service." });
  }
});

//Delete service
exports.deleteService = catchAsyncErrors(async (req, res, next) => {
  const service = await Services.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("service not found", 404));
  }
  await service.deleteOne();

  res.status(200).json({
    success: true,
    message: "service successfully Deleted",
  });
});

//get all services
exports.getAllServices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const servicesCount = await Services.countDocuments();

  const apiFeature = new ApiFeatures(Services.find(), req.query)
    .search()
    .filter();
  const services = await apiFeature.query;
  let filteredServicesCount = services.length;

  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    services,
    servicesCount,
    resultPerPage,
    filteredServicesCount,
  });
});

// //Get Single service
// exports.getSingleService = async (req, res, next) => {
//   const service = await Services.findById(req.body.id).search();

//   if (!service) {
//     return next(new ErrorHander("Product not found", 404));
//   }
//   res.status(200).json({
//     success: true,
//     service,
//   });
// };

//Get Single service
exports.getSingleService = async (req, res, next) => {
  try {
    const service = await Services.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    return next(error);
  }
};

//Update service --Admin
exports.updateService = catchAsyncErrors(async (req, res, next) => {
  let service = Services.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Product not found", 404));
  }

  service = await Services.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});
