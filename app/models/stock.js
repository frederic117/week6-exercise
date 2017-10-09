const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    longName: {
      type: String,
      required: true
    },
    isin: String,
    shortName: String,
    description: String,
    price: Number,
    variation: Number,
    trend: {
      type: Array,
      default: [0.5, 0.5]
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

var Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
