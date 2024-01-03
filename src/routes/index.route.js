const router = require("express").Router();
const reviewsRouter = require("./reviews.route");
const authRouter = require("./auth.route");
const dashboardRouter = require("./dash.route");

router.get("/", (req, res) => {
  res.send(
    "An API designed to manage product reviews and user authentication for the SleepOutside E-Commerce Website"
  );
});
router.use("/dashboard", dashboardRouter);
router.use("/reviews", reviewsRouter);
router.use("/", authRouter);
module.exports = router;
