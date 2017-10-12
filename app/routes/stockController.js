const express = require("express");
const stockController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const moment = require("moment");
const getStockPrice = require("../../config/financeStream");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// STOCK SECTION =========================
stockController.get("/:name", ensureLoggedIn, function(req, res, next) {
  const stock = req.params.name.toUpperCase();
  const stockId = req.params.name;

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);

    Babble.find({ stockLink: stock._id })
      .sort({ created_at: -1 })
      .populate("user_id")
      .exec((err, timeline) => {
        res.render("stock/stock", {
          stockId,
          stock,
          timeline,
          moment,
          user: req.user
        });
      });
  });
});

// Post a babble
stockController.post("/:name", ensureLoggedIn, (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name;

  findStock(req.body.babble).then(text => {
    const newBabble = new Babble({
      user_id: user._id,
      user_name: user.local.username,
      babble: req.body.babble,
      stockLink: text
    });

    newBabble.save(err => {
      if (err) {
        return;
      }

      newBabble.save(err => {
        if (err) {
          res.render("stock/stock", {
            username: user.username
          });
        } else {
          // GAMIFICATION => +20 points per babble posted
          User.findByIdAndUpdate(user._id, { $inc: { score: 20 } }).exec();
          res.redirect(`/stock/${stockId}`);
        }
      });
    });
  });
});

//reply
stockController.post("/:name/reply", ensureLoggedIn, (req, res, next) => {
  const user = req.user;
  const user_id = user._id;
  const user_name = user.local.username;
  const babble = req.body.parentModal;
  const stockId = req.params.name;

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
        return res.redirect(`/stock/${stockId}`);
      }
    );
  });
});

// New like
stockController.post("/:name/like", ensureLoggedIn, (req, res, next) => {
  const babble = req.body.likeInput;
  const stockId = req.params.name;

  Babble.findByIdAndUpdate(babble, { $inc: { like: 1 } }).exec();
  Babble.findByIdAndUpdate(babble)
    .populate("user_id")
    .exec((err, user) => {
      // GAMIFICATION => receive 10 points because receive 1 like
      User.findByIdAndUpdate(user.user_id._id, { $inc: { score: 10 } }).exec();
      if (err) return next(err);
      res.redirect(`stock/${stockId}`);
    });
});

// Add to watchList
stockController.post("/:name/watchlist", ensureLoggedIn, (req, res, next) => {
  const user = req.user;
  const stockId = req.params.name;

  Stock.findOne({ longName: stockId }).then(stock => {
    const newWatchItem = new WatchItem({
      username: user.local.username,
      stockId: stock._id,
      position: "none"
    });

    newWatchItem.save(newItem => {
      User.findByIdAndUpdate(user._id, {
        $push: { watchList: newItem }
      }).exec();
      res.redirect(`/stock/${stockId}`);
    });
  });
});

// Post a bull
stockController.post("/:name/bull", ensureLoggedIn, (req, res, next) => {
  const stockId = req.params.name;
  const user = req.user;

  User.findByIdAndUpdate(user._id).exec((err, user) => {
    if (err) return next(err);
    res.redirect(`stock/${stockId}`);
  });
});

module.exports = stockController;
