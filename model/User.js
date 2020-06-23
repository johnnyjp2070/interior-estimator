const mongoose = require("mongoose");
// const Schema = new mongoose.Schema()

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = Users = mongoose.model("user", userSchema);
