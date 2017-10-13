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
const findStock = require("../../config/stockIdentifier");
const addLink = require("../../config/addlink");

// STREAM SECTION =========================
streamController.get("/", ensureLoggedIn, function(req, res) {
  const avoidPeople = req.user.following;
  avoidPeople.push(req.user._id);

  User.find({ _id: { $nin: avoidPeople } })
    .sort({ score: -1 })
    .exec((err, followers) => {
      Babble.find({})
        .sort({ created_at: -1 })
        .populate("user_id")
        .populate("reply.user_id")
        .exec((err, timeline) => {
          console.log("followers*******", followers);
          res.render("stream", {
            user: req.user,
            timeline: timeline,
            moment: moment,
            followers: followers
          });
        });
    });
});

// Follow an insiders
streamController.post("/follow/:id", ensureLoggedIn, (req, res, next) => {
  const user = req.user;
  console.log("USER", user);
  const insiderId = req.params.name;
  console.log("INSIDER", insiderId);
  // GAMIFICATION => Add 20 points per people that follow you
  User.findByIdAndUpdate(insiderId, { $inc: { score: 20 } }).exec();

  User.findByIdAndUpdate(
    { _id: user._id },
    { $push: { following: insiderId } },
    err => {
      if (err) {
        return next(err);
      }
      // GAMIFICATION => +10 points per babble replied posted
      User.findByIdAndUpdate(user._id, { $inc: { score: 10 } }).exec();
      return res.redirect(`/stream`);
    }
  );
});

// Post a babble
streamController.post("/", ensureLoggedIn, (req, res, next) => {
  const user = req.user;

  findStock(req.body.babble).then(text => {
    const newBabble = new Babble({
      user_id: user._id,
      user_name: user.local.username,
      babble: req.body.babble,
      stockLink: text
    });

    newBabble.save(err => {
      if (err) {
        res.render("stream", {
          username: user.username
        });
      } else {
        // GAMIFICATION => +20 points per babble  posted
        User.findByIdAndUpdate(user._id, { $inc: { score: 20 } }).exec();
        console.log("SCORE OF THE USER", user.score);
        res.redirect("/stream");
      }
    });
  });
});

// Reply
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
        // GAMIFICATION => +10 points per babble replied posted
        User.findByIdAndUpdate(user._id, { $inc: { score: 10 } }).exec();
        return res.redirect("/stream");
      }
    );
  });
});

// New like
streamController.post("/like", ensureLoggedIn, (req, res, next) => {
  const babble = req.body.likeInput;

  Babble.findByIdAndUpdate(babble, { $inc: { like: 1 } }).exec();
  Babble.findByIdAndUpdate(babble)
    .populate("user_id")
    .exec((err, user) => {
      // GAMIFICATION => receive 10 points because receive 1 like
      User.findByIdAndUpdate(user.user_id._id, { $inc: { score: 10 } }).exec();
      if (err) return next(err);
      res.redirect("/stream");
    });
});

//TEST
streamController.get("/test", (req, res, next) => {
  User.findByIdAndUpdate("59dcf4b83f917e288f00660b", {
    $inc: { score: 20 }
  }).exec(function(err, post) {
    if (err) return next(err);
    res.redirect("/profile/59dcf4b83f917e288f00660b");
  });
});

module.exports = streamController;
