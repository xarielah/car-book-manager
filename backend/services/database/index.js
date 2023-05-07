const mongoose = require("mongoose");
const keys = require("../../config/keys");

function connect() {
  return mongoose.connect(keys.database.uri);
}

module.exports = { connect };
// # Export db con fn
