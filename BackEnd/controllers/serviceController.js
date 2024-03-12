const Services = require("../models/serviceModel"); // Assuming your services model is in servicesModel.js
const ErrorHander = require("../utility/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;

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

    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price ||
      !req.body.category ||
      !req.body.Branch ||
      !req.body.Dos
    ) {
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
      price: req.body.price,
      image: [imageData],
      category: req.body.category,
      Branch: req.body.Branch,
      Dos:req.body.Dos,
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