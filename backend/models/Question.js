const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  space: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  answer: { type: [String], required: true },
  up: { type: [String], required: true },
  time: { type: String, required: true },
  creatorid: { type: String, required: true },
  creatorName: { type: String, required: true },
});

const Question = mongoose.model("questions", questionSchema);

module.exports = Question;
