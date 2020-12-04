const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Answer = require("./models/Answer");
const Question = require("./models/Question");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function answerDetail(req, res) {
  var question = req.params.qid;
  Answer.find({ qid: question })
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

async function answerDelete(req, res) {
  var answer = req.params.aid;
  var question = req.params.qid;
  await Question.updateOne({ _id: question }, { $pull: { answer: answer } });
  await Answer.remove({ _id: answer });
  Answer.find({ qid: question })
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

async function answerNew(req, res) {
  var x = uuidv4();
  await Answer.create({
    _id: x,
    qid: req.body.qid,
    content: req.body.content,
    uid: req.body.uid,
    uname: req.body.uname,
    time: req.body.time,
  });
  await Question.updateOne({ _id: req.body.qid }, { $push: { answer: x } });
  Answer.find({ qid: req.body.qid })
    .sort({ time: -1 })
    .exec((err, result) => {
      res.send(result);
    });
}

router.post("/new", answerNew);
router.get("/:qid", answerDetail);
router.get("/delete/:aid/:qid", answerDelete);

module.exports = router;
