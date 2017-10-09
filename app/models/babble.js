var mongoose = require("mongoose");
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
    user_name: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

var Babble = mongoose.model("Babble", babbleSchema);
module.exports = Babble;
