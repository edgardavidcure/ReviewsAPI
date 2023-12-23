const config = require("../../src/config/index.config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
function generateToken(user) {
  const payload = {
    userId: user._id,
    displayName: user.displayName,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePic: user.image,
  };
  const secretKey = config.jwtSecretKey;

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
}

module.exports = generateToken;
