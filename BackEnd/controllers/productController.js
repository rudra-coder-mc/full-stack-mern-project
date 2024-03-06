const Product = require("../models/productModel");
const ErrorHander = require("../utility/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utility/apifetures");
const { query } = require("express");
const cloudinary = require("cloudinary");
const multer = require("multer");
const path = require("path");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let fileName = Date.now() + "-" + req.files.image.name;
  let newPath = path.join(process.cwd(), "test", fileName);
  console.log(req.files.image.mv(newPath));
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Where to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Rename files with unique name
//   },
// });

// // Initialize multer upload

// exports.upload = multer({ storage: storage });

// // Create Product --Admin
// exports.createProduct = catchAsyncErrors(async (req, res, next) => {
//   console.log(req.file);
//   console.log(req.body);
//   // req.body.user = req.user.id;
//   // // const product = await Product.create(req.body);
//   // const Image = req.body.Image;
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
//   if (!req.file) {
//     return res
//       .status(400)
//       .json({ message: "Please select an image to upload." });
//   }
//   console.log(req.file);
//   try {
//     // Save image information to MongoDB
//     const product = await Product.create({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       image: [
//         {
//           public_id: req.file.filename, // Assuming the filename is used as the public_id
//           url: req.file.path, // Assuming the path is used as the URL
//         },
//       ],
//       category: req.body.category,
//       Stock: req.body.Stock,
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

// Create Product -- Admin
// exports.createProduct = catchAsyncErrors(async (req, res, next) => {
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   const imagesLinks = [];

//   for (let i = 0; i < images.length; i++) {
//     const result = await cloudinary.v2.uploader.upload(images[i], {
//       folder: "products",
//     });

//     imagesLinks.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     });
//   }

//   req.body.images = imagesLinks;
//   req.body.user = req.user.id;

//   const product = await Product.create(req.body);

//   res.status(201).json({
//     success: true,
//     product,
//   });
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
  const product = await Product.findById(req.params.id).search();

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
