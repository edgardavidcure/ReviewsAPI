const router = require("express").Router();
const passport = require("passport");
const {
  generateToken,
  authenticateJWT,
} = require("../middleware/jwt.middleware");

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
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "none",
      });
      res.redirect("https://sleepout.netlify.app/dashboard/");
    } catch (error) {
      res.status(400).json({
        message: "User Not Authenticated",
        error: error.message,
      });
    }
  }
);

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" }).send();
    } else {
      res.clearCookie("jwt");
      res.status(201).json({ message: "Logout succesful" });
    }
  });
});

module.exports = router;
