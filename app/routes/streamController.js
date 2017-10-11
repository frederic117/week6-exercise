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
      timeline.forEach(babble => {
        babble.formattedDate = moment(babble.created_at).format("llll");
      });
      res.render("stream", {
        user: req.user,
        timeline: timeline
      });
    });
});

streamController.post("/", ensureLoggedIn, (req, res, next) => {
  const user = req.user;

  User.findOne({ _id: user._id }).exec((err, user) => {
    if (err) {
      return;
    }
    console.log("LE USER ID EST", user._id);
    const newBabble = new Babble({
      user_id: user._id,
      user_name: user.local.username,
      babble: req.body.babble
    });

    console.log("POST DE BABBLE", newBabble);

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

streamController.post("/reply", ensureLoggedIn, (req, res, next) => {
  const user = req.user;
  const user_id = user._id;
  const user_name = user.local.username;
  const babble = req.body.parentModal;

  Babble.findById(babble, (err, babble) => {
    if (err) {
      return next(err);
    }

    const newReply = new Babble({
      user_id,
      user_name,
      babble: req.body.babble
    });

    Babble.findByIdAndUpdate(
      { _id: babble._id },
      { $push: { reply: newReply } },
      err => {
        if (err) {
          return next(err);
        }
        return res.redirect("/stream");
      }
    );
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
