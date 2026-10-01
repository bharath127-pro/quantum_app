const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "student"
  },

  skillScore: {
    type: Number,
    default: 0
  },

  progress: {
    type: Number,
    default: 0
  },

  completedLessons: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("User", userSchema);