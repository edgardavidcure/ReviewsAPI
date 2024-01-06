const router = require("express").Router();
const reviewsController = require("../controllers/reviews.controller");
const { authenticateJWT } = require("../middleware/jwt.middleware");

router.get("/user/:userId", reviewsController.getReviewsByUserId);
router.get("/product/:productId", reviewsController.getReviewsByProductId);
router.post("/", authenticateJWT, reviewsController.addProductReview);
router.get("/", (req, res) => {
  res.send("An endpoint to manage reviews");
});

module.exports = router;
