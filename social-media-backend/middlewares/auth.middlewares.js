/** @format */

const { getUser } = require("../service/auth.service");

async function checkUserAuthorized(req, res, next) {
  let uid = req.cookies.uid;

  if (!uid) {
    return res.status(401).json({ error: "User not logged in" });
  }

  try {
    let isTokenValid = await getUser(uid);
    if (!isTokenValid) {
      console.log("Invalid token. Redirecting to login page.");
      return res.status(401).json({ error: "User not logged in" });
    }
    req.id = isTokenValid;
    next();
  } catch (error) {
    console.log("Error checking user authorization:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
