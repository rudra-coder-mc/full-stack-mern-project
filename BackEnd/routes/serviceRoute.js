const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createService, deleteService} = require("../controllers/serviceController")
const router = express.Router();

router.route("/service/new").post(isAuthenticatedUser, createService);
router
  .route("/admin/service/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);

module.exports = router;
