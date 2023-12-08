const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("An endpoint to manage reviews");
});

module.exports = router;
