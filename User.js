const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "instructor"],
    default: "student"
  },

  department: {
    type: String,
    default: ""
  },

  progress: {
    type: Number,
    default: 0
  },

  skillScore: {
    type: Number,
    default: 0
  },

  projectsBuilt: {
    type: Number,
    default: 0
  },

  challengesCompleted: {
    type: Number,
    default: 0
  },

  courseProgress: {
    type: Object,
    default: {
      1: 0,
      2: 0
    }
  },

  completedLessons: {
    type: Object,
    default: {}
  },

  completedProjects: {
    type: Object,
    default: {}
  },

  completedChallenges: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("User", userSchema);

