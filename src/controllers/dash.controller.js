const Reviews = require("../models/reviews.model");
const User = require("../models/user.model");

const getDashboardData = async (req, res) => {
  try {
    const reviews = await Reviews.find({ googleId: req.params.id });
    const user = await User.find({ googleId: req.params.id });
    const dashData = { reviews, user };
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(dashData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = { getDashboardData };
