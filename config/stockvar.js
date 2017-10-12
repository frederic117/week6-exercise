const fstream = require("finance-stream");
const _ = require("highland");
const Stock = require("../app/models/stock");
const User = require("../app/models/user");
const Babble = require("../app/models/babble");
const moment = require("moment");
const cheerio = require("cheerio");
const request = require("request");

// example with "http://www.boursorama.com/cours.phtml?symbole=1rPDG"

function getStockVar(url) {
  return new Promise((resolve, reject) => {
    request(url, function(error, response, html) {
      if (error) reject(error);
      if (!error && response.statusCode == 200) {
        // const regex = /itemprop="price"\s+content="([^"]+)/;
        const regex = /<span class="color3 variation">(0\.75)%<\/span>/;

        const variance = [];
        while (variance.length < 1) {
          const match = regex.exec(html);
          if (match === null) {
            break;
          } else {
            variance.push(match[1]);
            resolve(variance);
          }
        }
      }
    });
  });
}

module.exports = getStockVar;
