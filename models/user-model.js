const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  List: [String],
});

module.exports = mongoose.model("MovieUser", userSchema);
