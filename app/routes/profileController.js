const express = require("express");
const profileController = express.Router();
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
// Moment to format dates
const moment = require("moment");
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require("../../middlewares/user-roles-auth");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

// MY PROFILE SECTION =========================
profileController.get("/", ensureLoggedIn, function(req, res) {
    Babble.find({ user_id: req.user._id })
        .sort({ created_at: -1 })
        .populate("user_id")
        .populate("reply.user_id")
        .exec((err, timeline) => {
            res.render("profile/profile", {
                user: req.user,
                timeline: timeline,
                moment: moment
            });
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

// OTHER INSIDERS PROFILE SECTION =========================
profileController.get("/:id", ensureLoggedIn, function(req, res, next) {
    const userId = req.params.id;
    User.findById(userId).then(insider => {
        return insider.populate("watchList").execPopulate()
    }).then(populatedInsider => {
        res.render("profile/insider", { insider: populatedInsider });
    });
});

module.exports = profileController;