const config = require("../../src/config/index.config");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const crypto = require("crypto");
function generateToken(user) {
  const payload = {
    userId: user.googleId,
    displayName: user.displayName,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePic: user.image,
  };
  const secretKey = config.jwtSecretKey;

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
}

function decodeToken(token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  return decodedToken;
}

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token.split(" ")[1], config.jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = { generateToken, decodeToken, authenticateJWT };
