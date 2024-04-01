const express = require("express");
const {
  processPayment,
  paymentVerification,
  sendRayzonApiKey
} = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/paymentverification").post(paymentVerification)

router.route("/razorapikey").get(isAuthenticatedUser, sendRayzonApiKey);

module.exports = router;
