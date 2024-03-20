const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({ url: session.url });
  } catch (error) {
    // Catch the error here
    res.status(500).json({ error: error.message }); // Return error message in response
  }
});
