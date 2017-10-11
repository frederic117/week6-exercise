const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const babbleSchema = new Schema(
  {
    babble: {
      type: String,
      required: [true, "babble can't be empty"]
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    user_name: String,
    stockLink: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stock"
      }
    ],
    like: {
      type: Number,
      default: 0
    },
    babble_img: String,
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "Babble"
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

const Babble = mongoose.model("Babble", babbleSchema);
module.exports = Babble;
