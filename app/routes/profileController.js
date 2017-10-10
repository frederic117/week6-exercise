const express = require("express");
const profileController = express.Router();
const User = require("../models/user");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require("../../middlewares/user-roles-auth");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

// PROFILE SECTION =========================
profileController.get("/", ensureLoggedIn, function(req, res) {
  res.render("profile/profile", {
    user: req.user
  });
});
profileController.get("/edit", ensureLoggedIn, function(req, res) {
  res.render("profile/edit", {
    user: req.user
  });
});

profileController.post(
  "/edit",
  ensureLoggedIn,
  upload.single("picProfile"),
  (req, res) => {
    const update = {
      location: req.body.location,
      website: req.body.website,
      bio: req.body.bio
    };
    if (req.file && req.file.filename)
      update.picProfile = `/uploads/${req.file.filename}`;
    console.log("UPDATE:", update);
    console.log("ID A TROUVER:", req.user._id);
    User.findByIdAndUpdate(req.user._id, { $set: update }, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  }
);

module.exports = profileController;
