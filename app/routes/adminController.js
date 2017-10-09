const express = require("express");
const adminController = express.Router();
const User = require("../models/user");
const Stock = require("../models/stock");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// tweetsController.use((req, res, next) => {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     res.redirect("/auth/login");
//   }
// });

adminController.get("/", function(req, res) {
  res.render("admin/index", {
    user: req.user
  });
});

adminController.get("/stock", function(req, res) {
  res.render("admin/stock", {
    user: req.user
  });
});

module.exports = adminController;
