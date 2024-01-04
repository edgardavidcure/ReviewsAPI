const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});
module.exports = mongoose.model("Review", reviewSchema);
