const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Payment = require("../models/paymentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const razorpay = require("razorpay");
const crypto = require("crypto"); 

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//     metadata: {
//       company: "Ecommerce",
//     },
//   });

//   res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// });

// exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: "http://localhost:5173/success",
//       cancel_url: "http://localhost:5173/cancel",
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     // Catch the error here
//     res.status(500).json({ error: error.message }); // Return error message in response
//   }
// });
const instance = new razorpay({
  key_id: process.env.RAYZORPAY_API_KEY,
  key_secret: process.env.RAYZORPAY_API_SECRET_KEY,
});
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
    success: true,
    order,
  });
});

//payment verification
exports.paymentVerification = catchAsyncErrors(async(req,res,next)=>{
     const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
     const body = razorpay_order_id + "|" + razorpay_payment_id;
     const expectedsignature = crypto.createHash('sha256',process.env.RAYZORPAY_API_SECRET_KEY).update(body.toString('hex'));
     const isauth = expectedsignature === razorpay_signature;
     if(isauth){
      await Payment.create({
        razorpay_order_id,razorpay_payment_id,razorpay_signature
      })
      res.redireact(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
     }
     else{
      res.status(400).json({success:false})
     }
})

exports.sendRayzonApiKey = catchAsyncErrors(async (req, res, next) => {
      res.status(200).json({ stripeApiKey: process.env.RAYZORPAY_API_KEY });
    });