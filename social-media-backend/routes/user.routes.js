/** @format */

const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
  handleLogOut,
} = require("../controllers/user.controllers");

const { validateUser } = require("../middlewares/dataparser.middlewares");

router.route("/login").post(handleLogin);
router.route("/signup").post(validateUser, handleSignup);
router.route("/logout").get(handleLogOut);

module.exports = router;
