const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "india" },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },

      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      // required:true
    },
    status: {
      type: String,
      // required:true
    },
    paidAt: {
      type: Date,
    },
    itemsPrices: {
      type: Number,
      default: 0,
    },
    taxPrices: {
      type: Number,
      default: 0,
    },
    shippingPrices: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});
// const orderSchema = new mongoose.Schema({

//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, default: "india" },
//   pinCode: {
//     type: String,
//     required: true,
//   },
//   phoneNo: {
//     type: String,
//     required: true,
//   },

//   orderItems: {
//     type: Array,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   itemsPrices: {
//     type: Number,
//     default: 0,
//   },
//   taxPrices: {
//     type: Number,
//     default: 0,
//   },
//   shippingPrices: {
//     type: Number,
//     default: 0,
//   },
//   totalPrices: {
//     type: Number,
//     default: 0,
//   },
//   orderStatus: {
//     type: String,
//     default: "Processing",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

module.exports = mongoose.model("Order", orderSchema);
