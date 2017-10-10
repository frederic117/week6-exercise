// server.js

// set up ======================================================================
// get all the tools we need
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const profileController = require("./app/routes/profileController.js");
const streamController = require("./app/routes/streamController.js");
const stockController = require("./app/routes/stockController.js");
const adminController = require("./app/routes/adminController.js");

// configuration ===============================================================
mongoose.connect("mongodb://localhost/insidersDb", {
  useMongoClient: true
}); // connect to our database

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(
  session({
    secret: "weloveinsiders", // session secret
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Magic trick
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// routes ======================================================================
require("./app/routes/auth.js")(app, passport);
app.use("/", profileController);
app.use("/stream", streamController);
app.use("/stock", stockController);
app.use("/admin", adminController);

// launch ======================================================================
app.listen(port);
console.log("The magic happens on port " + port);
