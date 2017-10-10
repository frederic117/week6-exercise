const express = require("express");
const leaderboardController = express.Router();
const User = require("../models/user");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

leaderboardController.get("/", ensureLoggedIn, function(req, res) {
  res.render("leaderboard/leaderboard", {
    user: req.user
  });
});

module.exports = leaderboardController;
