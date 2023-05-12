const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    milage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("car", carSchema);
module.exports = Car;
