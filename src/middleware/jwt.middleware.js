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
  const secretKey = crypto.randomBytes(32).toString("hex");

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
}

module.exports = generateToken;
