const express = require("express");
const trendingController = express.Router();
const User = require("../models/user");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

trendingController.get("/", function(req, res) {
  res.render("trending/trending", {
    user: req.user
  });
});

module.exports = trendingController;
