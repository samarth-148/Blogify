/** @format */

const { getUser } = require("../service/auth.service");

async function checkUserAuthorized(req, res, next) {
  let uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).json({ msg: "Login/Signup required" });
  }
  try {
    let isTokenValid = await getUser(uid);
    if (!isTokenValid) {
      return res.status(401).json({ msg: "Login/Signup required" });
    }
    req.id = isTokenValid;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function isUserLoggedIn(req, res, next) {
  let uid = req.cookies?.uid;
  if (!uid) {
    req.isLoggedIn = false;
  } else {
    let isTokenValid = await getUser(uid);
    if (!isTokenValid) {
      req.isLoggedIn = false;
    } else {
      req.isLoggedIn = true;
      req.id = isTokenValid;
    }
  }
  next();
}

module.exports = {
  checkUserAuthorized,
  isUserLoggedIn,
};
