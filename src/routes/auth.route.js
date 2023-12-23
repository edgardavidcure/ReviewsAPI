const router = require("express").Router();
const passport = require("passport");
const generateToken = require("../middleware/jwt.middleware");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://sleepout.netlify.app",
  }),
  (req, res) => {
    try {
      const jwtToken = generateToken(req.user);
      res.cookie("jwt", jwtToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
      });
      res.redirect("http://localhost:5173/dashboard/index.html");
    } catch (error) {
      res.status(400).json({
        message: "User Not Authenticated",
        error: error.message,
      });
    }
  }
);

router.post("/logout", (req, res) => {
  req.logOut();
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("https://sleepout.netlify.app");
});

module.exports = router;
