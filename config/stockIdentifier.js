const express = require("express");
const stockController = express.Router();
const Stock = require("../app/models/stock");

// Find all word used with an # in a text (babble)
function findHashtags(babble) {
  babble = babble.toUpperCase();
  const regex = /#(\w+)(?:\W|$)/g;
  const hashtags = [];
  while (true) {
    const match = regex.exec(babble);
    if (match === null) {
      break;
    } else {
      hashtags.push(match[1]);
    }
  }
  return hashtags;
}

// Retrieve stock longName and shortName in database from an array of word
// return the id
function findLinkableStocks(hashtags) {
  return Stock.find({
    $or: [
      {
        longName: { $in: hashtags }
      },
      {
        shortName: { $in: hashtags }
      }
    ]
  })
    .distinct("_id")
    .then(res => {
      console.log("RES**********", res);
      return res;
    });
}

function findStockInBabble(babble) {
  const hashtags = findHashtags(babble);
  return findLinkableStocks(hashtags);
}

module.exports = function(babble) {
  const hashtags = findHashtags(babble);
  return findLinkableStocks(hashtags);
};
