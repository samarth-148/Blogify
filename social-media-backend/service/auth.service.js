/** @format */

const jwt = require("jsonwebtoken");

const securekey = process.env.PRIVACY_KEY;

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    securekey
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwt.verify(token, securekey);
    return decodedToken.id;
  } catch (error) {
    // Handle invalid or expired token
    console.error("Error decoding token:", error);
    return null;
  }
}

module.exports = {
  getUser,
  setUser,
};
