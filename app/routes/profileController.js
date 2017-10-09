const express = require("express");
const profileController = express.Router();
const User = require("../models/user");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// PROFILE SECTION =========================
profileController.get("/profile", ensureLoggedIn, function(req, res) {
  res.render("profile.ejs", {
    user: req.user
  });
});

module.exports = profileController;
