const express = require("express");
const streamController = express.Router();
const User = require("../models/user");
const Babble = require("../models/babble");
// Moment to format dates
const moment = require("moment");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// STREAM SECTION =========================
streamController.get("/", ensureLoggedIn, function(req, res) {
  Babble.find({})
    .sort({ created_at: -1 })
    .populate("user_id")
    .exec((err, timeline) => {
      res.render("stream", {
        user: req.user,
        timeline: timeline,
        moment: moment
      });
    });
});

streamController.post("/", ensureLoggedIn, (req, res, next) => {
  const user = req.user;

  User.findOne({ username: user.username }).exec((err, user) => {
    if (err) {
      return;
    }

    const newBabble = new Babble({
      user_id: user._id,
      user_name: user.username,
      babble: req.body.babble
    });

    newBabble.save(err => {
      if (err) {
        res.render("stream", {
          username: user.username,
          errorMessage: err.errors.babble.message
        });
      } else {
        res.redirect("/stream");
      }
    });
  });
});

// New babble
streamController.get("/newBabble", ensureLoggedIn, function(req, res) {
  Babble.find({})
    .sort({ created_at: -1 })
    .populate("user_id")
    .exec((err, timeline) => {
      res.render("stream", {
        user: req.user,
        timeline: timeline,
        moment: moment
      });
    });
});

module.exports = streamController;
