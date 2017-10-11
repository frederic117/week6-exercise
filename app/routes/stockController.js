const express = require("express");
const stockController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const moment = require("moment");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// STOCK SECTION =========================
stockController.get("/:name", ensureLoggedIn, function(req, res, next) {
  const stock = req.params.name.toUpperCase();

  Stock.findOne({ longName: stock }, (err, stock) => {
    if (err) return next(err);
    Babble.find({ stockLink: stock._id })
      .sort({ created_at: -1 })
      .populate("user_id")
      .exec((err, timeline) => {
        res.render("stock/stock", { stock, timeline, moment, user: req.user });
      });
  });
});

module.exports = stockController;
