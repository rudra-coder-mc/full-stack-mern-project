const Product = require("../models/productModel");
const ErrorHander = require("../utility/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utility/apifetures");
const { query } = require("express");
const multer = require("multer");
const path = require("path");



const cloudinary = require('cloudinary').v2; // Assuming you have Cloudinary npm package installed

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // Configure Cloudinary with your account details
  cloudinary.config({
    cloud_name: 'dlc1in1ax',
    api_key: '915151645357372',
    api_secret: 'X_6Jckw5QVCWHwfVJgt8yvrgDcI'
  });

  // Validate image presence (adapt as needed for single/multiple image uploads)
  if (!req.files.image) {
    return res.status(400).json({ message: "Please select an image to upload." });
  }

  try {
    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      public_id: `${Date.now()}-${req.files.image.name}`, // Set a unique public ID
      resource_type: 'auto' // Automatically detect image/video type
    });

    req.body.user = req.user.id;

    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price ||
      !req.body.category ||
      !req.body.stock
    ) {
      return res.status(400).json({ message: "Missing required fields in request body." });
    }

    const imageData = {
      url: uploadResult.secure_url // Use the secure image URL provided by Cloudinary
    };

    // Save image information and other product details to MongoDB
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: [imageData],
      category: req.body.category,
      stock: req.body.stock,
      numOfReviews: null,
      reviews: [],
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading product." });
  }
});


// exports.createProduct = catchAsyncErrors(async (req, res, next) => {
//   exports.fileName = Date.now() + "-" + req.files.image.name;
//   let newPath = path.join(process.cwd(), "./BackEnd/public/Uploads", fileName);
//   req.files.image.mv(newPath);
//   req.body.user = req.user.id;
//   // const product = await Product.create(req.body);
//   // console.log(req.body);
//   if (
//     !req.body.name ||
//     !req.body.description ||
//     !req.body.price ||
//     !req.body.category ||
//     !req.body.stock
//   ) {
//     return res
//       .status(400)
//       .json({ message: "Missing required fields in request body." });
//   }

//   // Assuming you are using Multer middleware
//   if (!newPath) {
//     return res
//       .status(400)
//       .json({ message: "Please select an image to upload." });
//   }

//   try {
//     // Save image information to MongoDB
//     const product = await Product.create({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       image: [
//         {
//           url: fileName,
//         },
//       ],
//       category: req.body.category,
//       stock: req.body.stock,
//       numOfReviews: null,
//       reviews: [],
//     });
//     res.status(201).json({
//       success: true,
//       product,
//     });
//     res.send("Product uploaded successfully");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products = await apiFeature.query;
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Get Single Product
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.body.id).search();

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

//Update Product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product successfully Deleted",
  });
});

//Create New Review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review
exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
