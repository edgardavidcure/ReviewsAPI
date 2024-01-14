const express = require("express");
const router = require("./src/routes/index.route");
const config = require("./src/config/index.config");
const connectDB = require("./src/database/database");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const PORT = config.port ?? 3000;

require("./src/config/passport.config")(passport);

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "https://ec-sleepoutside.com", // Replace with your frontend's URL
    credentials: true, // Enable credentials (cookies, Authorization header)
  })
);
app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  });
  res.header({
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  });
  res.header({
    "Access-Control-Allow-Origin": "https://ec-sleepoutside.com",
  }),
    res.header({ "Access-Control-Allow-Credentials": true });

  next();
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ uri: config.databaseURL, collection: "sessions" }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);
connectDB();
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
