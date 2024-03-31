/** @format */

const User = require("../models/user.model");
const { setUser } = require("../service/auth.service");

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const isUserFind = await User.findOne({ email, password });
  if (!isUserFind) {
    return res.status(404).json({ Login: false });
  }
  const token = await setUser(isUserFind);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    sameSite: "None",
    domain: ".netlify.app", // Set domain to .netlify.app
    path: "/",
  });

  return res.status(200).json({ Login: true });
}

async function handleSignup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User with this email already exists" });
  }

  let createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  const token = await setUser(createdUser);

  res.cookie("uid", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    sameSite: "None",
    domain: ".netlify.app", // Set domain to .netlify.app
    path: "/",
  });

  return res.status(200).json({ Login: true });
}

async function handleLogOut(req, res) {
  res.clearCookie("uid");
  return res.status(200).json({ Login: false });
}

module.exports = {
  handleLogin,
  handleSignup,
  handleLogOut,
};
