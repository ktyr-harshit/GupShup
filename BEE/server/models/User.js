const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  authProvider: {
    type: String,
    default: "local",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  personalUsername: {
    type: String,
    unique: true,
    sparse: true
  },
});

module.exports = mongoose.model("User", userSchema);