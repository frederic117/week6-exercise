const express = require("express");
const stockController = express.Router();
const Stock = require("../models/stock");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// STOCK SECTION =========================
stockController.get("/", ensureLoggedIn, function(req, res) {
  res.render("stock", {});
});

module.exports = stockController;
