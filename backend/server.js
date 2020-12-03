const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

const app = express();
var cors = require("cors");

var question = require("./question");
var answer = require("./answer");

app.use("/question", question);
app.use("/answer", answer);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const mongo_uri = "mongodb://localhost/studentDB";
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    await User.create({
      _id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
    });
    res.status(200).send("Welcome to the club!");
  } catch (error) {
    res.status(500).send("Duplicated user's email address");
  }
});

app.post("/api/authenticate", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const { _id, name, email, password } = user;
        res.send({ _id, name, email, password });
      } else {
        res.status(401).send("Unauthorized Access");
      }
    } else {
      res.status(401).send("User is not registered");
    }
  } catch (error) {
    res.status(500).send("Internal Server error Occured");
  }
});

app.listen(8000, () => {
  console.log("App is listening on port 8000!");
});
