const router = require("express").Router();

router.get("/login", (req, res) => {
  res.send("An endpoint to handle Oauth login functionality");
});
router.get("/logout", (req, res) => {
  res.send("An endpoint to handle Oauth logout functionality");
});

module.exports = router;
