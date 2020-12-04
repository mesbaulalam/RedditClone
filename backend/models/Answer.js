const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  qid: { type: String, required: true },
  content: { type: String, required: true },
  uid: { type: String, required: true },
  uname: { type: String, required: true },
  time: { type: String, required: true },
});

const Answer = mongoose.model("answers", answerSchema);

module.exports = Answer;
