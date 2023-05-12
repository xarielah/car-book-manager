require("./config/passport");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dbService = require("./services/database");
const doLog = require("./lib/utils/logger");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");

const isAuthed = require("./middleware/must-be-authed");

const carController = require("./routes/car");
const authController = require("./routes/auth");
const recordController = require("./routes/record");
const passport = require("passport");

const PORT = keys.app.port;

app.use(
  cors({
    origin: keys.app.front ?? "http://localhost:7153/",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authController);
app.use("/manage-cars", isAuthed, carController);
app.use("/car-records", isAuthed, recordController);

app.use("*", (_, res) => {
  res.send("Default page");
});

app.listen(PORT, () => {
  const SULAMIT = 50;

  console.log("#".repeat(SULAMIT));
  doLog("Service running at " + PORT);
  dbService
    .connect()
    .then(() => doLog("MongoDB connection successful"))
    .catch(() => doLog("MongoDB connection ERROR!!"))
    .finally(() => console.log("#".repeat(SULAMIT)));
  // # Add DB connection log here.
});
