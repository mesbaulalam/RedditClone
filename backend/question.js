const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Question = require("./models/Question");
const Answer = require("./models/Answer");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function questionHome(req, res) {
  Question.find({})
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

async function questionAsk(req, res) {
  try {
    await Question.create({
      _id: uuidv4(),
      space: req.body.space,
      title: req.body.title,
      content: req.body.content,
      time: req.body.time,
      creatorid: req.body.creatorid,
      creatorName: req.body.creatorName,
    });
    res.status(200).send("Question added!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding question");
  }
}

async function questionEdit(req, res) {
  try {
    await Question.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          space: req.body.space,
          title: req.body.title,
          content: req.body.content,
          time: req.body.time,
        },
      }
    );
    Question.find({})
      .sort({ time: -1 })
      .exec((err, result) => {
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding question");
  }
}

async function questionUpvote(req, res) {
  var question = req.params.qid;
  var user = req.params.uid;
  await Question.updateOne({ _id: question }, { $push: { up: user } });
  Question.find({})
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

async function questionDownvote(req, res) {
  var question = req.params.qid;
  var user = req.params.uid;
  await Question.updateOne({ _id: question }, { $pull: { up: user } });
  Question.find({})
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

async function questionDelete(req, res) {
  var question = req.params.qid;
  var answer = req.body.answer;
  answer.forEach(async (element) => {
    await Answer.remove({ _id: element });
  });
  await Question.remove({ _id: question });
  Question.find({})
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

router.get("/", questionHome);
router.post("/ask", questionAsk);
router.post("/edit", questionEdit);
router.get("/upvote/:qid/:uid", questionUpvote);
router.get("/downvote/:qid/:uid", questionDownvote);
router.post("/delete/:qid", questionDelete);

module.exports = router;
