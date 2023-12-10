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
    const jwtToken = generateToken(req.user);
    res.json(jwtToken);
  }
);

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("https://sleepout.netlify.app");
});

module.exports = router;
