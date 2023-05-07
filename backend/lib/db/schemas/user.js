const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: String,
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105281/126044187-isolated-object-of-avatar-and-dummy-symbol-collection-of-avatar-and-image-stock-symbol-for-web.jpg",
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
