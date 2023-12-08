const router = require("express").Router();
const reviewsRouter = require("./reviews.route");
const authRouter = require("./auth.route");

router.get("/", (req, res) => {
  res.send(
    "An API designed to manage product reviews and user authentication for the SleepOutside E-Commerce Website"
  );
});
router.use("/reviews", reviewsRouter);
router.use("/", authRouter);
module.exports = router;
