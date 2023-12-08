const express = require("express");
const router = require("./src/routes/index.route");
const app = express();
const config = require("./src/config/index.config");

const PORT = config.port ?? 3000;

app.use("/login", require("./src/routes/auth.route"));

app.use("/", router);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
