const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createService,
  deleteService,
  getAllServices,
  getSingleService,
  updateService,
} = require("../controllers/serviceController");
const router = express.Router();

router.route("/service/new").post(isAuthenticatedUser, createService);
router
  .route("/admin/service/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateService);
router.route("/service").get(getAllServices);
router.route("/service/:id").get(getSingleService);

module.exports = router;
