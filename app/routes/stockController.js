const express = require("express");
const stockController = express.Router();
const Stock = require("../models/stock");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// STOCK SECTION =========================
stockController.get("/:name", ensureLoggedIn, function(req, res) {
  const name = req.params.name;
  Stock.findOne(name, (err, stock) => {
    if (err) return next(err);
    res.render("stock", {});
  });
});

module.exports = stockController;
