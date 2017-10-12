const express = require("express");
const leaderboardController = express.Router();
const User = require("../models/user");
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

leaderboardController.get("/", ensureLoggedIn, function(req, res) {
    User.find({})
        .sort({ score: -1 })
        .exec()
        .then((users) => {
            res.render("leaderboard/leaderboard", {
                user: req.user,
                users
            });
        })
});





module.exports = leaderboardController;