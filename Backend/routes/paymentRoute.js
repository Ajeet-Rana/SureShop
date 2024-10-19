const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");
const { isAuthenticatedUser } = require("../Middleware/auth");
const router = express.Router();
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
module.exports = router;
