const router = require("express").Router();
const Reviews = require("../models/reviews.model");
const { decodeToken } = require("../middleware/jwt.middleware");
const getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Reviews.find({ productId: productId });
    if (!reviews) {
      res
        .status(404)
        .json({ message: "No Reviews Available For This Product" });
    } else {
      res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
};

const getReviewsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Reviews.find({ userId: userId });
    if (!reviews) {
      res.status(404).json({ message: "No Reviews Available For This User" });
    } else {
      res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
};

const addProductReview = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const user = decodeToken(req.body.jwt);

    delete user.iat;
    delete user.exp;
    req.body.user = user;
    const data = await Reviews.create(req.body);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
};

module.exports = {
  getReviewsByProductId,
  getReviewsByUserId,
  addProductReview,
};
