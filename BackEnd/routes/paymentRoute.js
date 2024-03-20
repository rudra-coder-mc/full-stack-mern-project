const express = require("express");
const {
  processPayment,
} = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
