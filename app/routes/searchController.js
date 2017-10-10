const express = require("express");
const searchController = express.Router();
const User = require("../models/user");
const Stock = require("../models/stock");

searchController.get("/search_stock", function(req, res) {
  const regex = new RegExp(req.query["term"], "i");
  Stock.find({ longName: regex }, { longName: 1 })
    .sort({ longName: 1 })
    .limit(20)
    .then(stocks => {
      res.json(stocks);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = searchController;
