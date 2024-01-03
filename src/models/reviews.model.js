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
  rate: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Review", reviewSchema);
