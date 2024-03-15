const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createBooking, deleteBooking, getAllBooking} = require("../controllers/bookingController")
const router = express.Router();

router.route("/booking/new").post(isAuthenticatedUser, createBooking);
router
  .route("/booking/:id")
  .delete(isAuthenticatedUser, deleteBooking)
router.route("/booking").get(getAllBooking);
// router.route("/service/:id").get(getSingleService);

module.exports = router;
