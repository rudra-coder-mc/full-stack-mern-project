const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Services Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter description Name"],
  },
  price: {
    type: Number,
    default: 1000,
  },
  ratings: {
    type: Number,
    default: 4,
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Services Category"],
  },
  numOfReviews: {
    type: Number,
    default: 5,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
      rating: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Services", ServicesSchema);
