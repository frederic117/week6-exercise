const fstream = require("finance-stream");
const _ = require("highland");
const Stock = require("../app/models/stock");
const User = require("../app/models/user");
const Babble = require("../app/models/babble");
const moment = require("moment");
const cheerio = require("cheerio");
const request = require("request");

// example with "http://www.boursorama.com/cours.phtml?symbole=1rPDG"
getStockPrice("http://www.boursorama.com/cours.phtml?symbole=1rPDG");

function getStockPrice(url) {
  return new Promise((resolve, reject) => {
    request(url, function(error, response, html) {
      if (error) reject(error);
      if (!error && response.statusCode == 200) {
        // console.log(html);

        // regex => <td class="label gras">Variation<\/td>[\s\n]+<td[^>]*><span[^>]*>([^<]+)%?
        const percentRegex = /<td class="label gras">Variation<\/td>[\s\n]+<td[^>]*><span[^>]*>([^<]+)%?/;
        const priceRegex = /itemprop="price"\s+content="([^"]+)/;
        // const percentRegex = /<span class="color3 variation">([^"]+)%<\/span>/;
        // let $ = cheerio.load(html);

        const priceMatch = priceRegex.exec(html);
        const percentMatch = percentRegex.exec(html);

        const data = {
          price: priceMatch ? priceMatch[1] : undefined,
          percent: percentMatch ? percentMatch[1] : undefined
        };

        resolve(data);
      }
    });
  });
}

module.exports = getStockPrice;
