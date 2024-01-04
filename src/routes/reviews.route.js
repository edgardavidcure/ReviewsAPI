const router = require("express").Router();
const reviewsController = require("../controllers/reviews.controller");
const { authenticateJWT } = require("../middleware/jwt.middleware");
router.get("/", (req, res) => {
  res.send("An endpoint to manage reviews");
});

router.get("/:userId", reviewsController.getReviewsByUserId);
router.get("/:productId", reviewsController.getReviewsByProductId);
router.post("/", authenticateJWT, reviewsController.addProductReview);
module.exports = router;
