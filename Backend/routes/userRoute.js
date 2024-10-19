const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/login").post(loginUser);
router.route("/logout").get(userLogout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateDetails);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
module.exports = router;
