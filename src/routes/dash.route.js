const router = require("express").Router();
const dashboardController = require("../controllers/dash.controller");
router.get("/:id", dashboardController.getDashboardData);
module.exports = router;
