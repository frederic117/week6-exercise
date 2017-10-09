const express = require("express");
const adminController = express.Router();
const User = require("../models/user");
const Stock = require("../models/stock");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");

// tweetsController.use((req, res, next) => {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     res.redirect("/auth/login");
//   }
// });

adminController.get("/", function(req, res) {
  res.render("admin/index", {
    user: req.user
  });
});

adminController.get("/stock", function(req, res) {
  Stock.find({}, (err, stocks) => {
    if (err) return err;
    res.render("admin/stock", {
      stocks: stocks
    });
  });
});

adminController.post("/stock", function(req, res) {
  const newStock = new Stock({
    longName: req.body.longName,
    isin: req.body.isin,
    shortName: req.body.shortName,
    description: req.body.description,
    price: req.body.price,
    variation: req.body.variation,
    trend: [req.body.tendency, 100 - req.body.tendency]
  });
  newStock.save(err => {
    if (err) {
      res.render("stock", {});
    } else {
      res.redirect("stock");
    }
  });
});

module.exports = adminController;
