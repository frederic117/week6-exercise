const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

// define the schema for our user model
const userSchema = mongoose.Schema(
  {
    local: {
      email: {
        type: String,
        unique: true
      },
      password: {
        type: String
      },
      username: {
        type: String,
        unique: true
      }
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    picProfile: {
      type: String,
      default: "/images/avatar.png"
    },
    location: {
      type: String,
      default: "****"
    },
    website: {
      type: String,
      default: "none"
    },
    bio: {
      type: String,
      default: "none"
    },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    score: {
      type: Number,
      default: 0
    },
    watchList: [
      {
        type: Schema.Types.ObjectId,
        ref: "WatchItem"
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
