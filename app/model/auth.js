const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email is already in use"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
});

const User = mongoose.model("User", schema);
module.exports = User;
