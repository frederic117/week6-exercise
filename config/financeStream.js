const fstream = require("finance-stream");
const _ = require("highland");
const Stock = require("../app/models/stock");
const User = require("../app/models/user");
const Babble = require("../app/models/babble");
const moment = require("moment");
const cheerio = require("cheerio");
const request = require("request");

// example with "http://www.boursorama.com/cours.phtml?symbole=1rPDG"

function getStockPrice(url) {
  request(, function(
    error,
    response,
    html
  ) {
    if (!error && response.statusCode == 200) {
      // console.log(html);
      const regex = /itemprop="price"\s+content="([^"]+)/;
      // let $ = cheerio.load(html);
      const price = [];
      while (price.length < 1) {
        const match = regex.exec(html);
        if (match === null) {
          break;
        } else {
          price.push(match[1]);
          console.log(price);
        }
      }
    }
  });
}

module.exports = getStockPrice();
