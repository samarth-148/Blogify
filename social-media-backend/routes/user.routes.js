/** @format */

const express = require("express");
const router = express.Router();
const upload = require("../service/uploads");
const {
  handleSignup,
  handleLogin,
  handleLogOut,
  handleEditUserData,
  isUserNameAvailable,
  getUsers,
} = require("../controllers/user.controllers");
const { handleGetUserData } = require("../controllers/user.controllers");
const { validateUser } = require("../middlewares/dataparser.middlewares");
const {
  checkUserAuthorized,
  isUserLoggedIn,
} = require("../middlewares/auth.middlewares");

router.route("/login").post(handleLogin);
router.route("/signup").post(validateUser, handleSignup);
router.route("/logout").get(handleLogOut);
router.route("/userDetails").get(isUserLoggedIn, handleGetUserData);
router.route("/checkUsername").post(isUserNameAvailable);
router.route("/getAllUsers").get(getUsers);

router
  .route("/editUserData")
  .patch(checkUserAuthorized, upload.single("image"), handleEditUserData);

module.exports = router;
