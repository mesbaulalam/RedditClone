import React, { useState, useRef, useEffect } from "react";
import "./QuestionCard.css";
import "../AnswerCard/AnswerCard.css";
import { useHistory } from "react-router-dom";
import AnswerCard from "../AnswerCard/AnswerCard";
import axios from "axios";

export default function QuestionCard({
  card,
  answer,
  index,
  showAnswer,
  login,
  setQuestion,
  hot,
}) {
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  const [isAnswer, postAnswer] = useState(false);
  const [answer2, setAnswer2] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const toggledClass = expanded ? "expanded" : "collapsed";
  const len = Object.keys(login).length;
  const inputEl = useRef(null);

  const changeAnswers = (data) => {
    setAnswers(data);
  };

  function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  }

  useEffect(() => {
    setOverflow(
      inputEl.current.offsetHeight < inputEl.current.scrollHeight ||
        inputEl.current.offsetWidth < inputEl.current.scrollWidth
    );
  });

  async function toggleAnswer() {
    if (answer === index) {
      showAnswer(-1);
    } else {
      const headers = {
        "Content-Type": "application/json",
      };

      await axios
        .get(`http://localhost:8000/answer/${card._id}`, { headers })
        .then((res) => {
          setAnswers(res.data);
        })
        .catch((err) => {
          alert("Error fetching data! Please try again");
        });

      showAnswer(index);
    }
  }

  async function upVote() {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(`http://localhost:8000/question/upvote/${card._id}/${login._id}`, {
        headers,
      })
      .then((res) => {
        if (hot === true) {
          var questions = res.data.sort(function (a, b) {
            return b.up.length - a.up.length;
          });
          setQuestion(questions);
        } else {
          setQuestion(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data! Please try again");
      });
  }

  async function downVote() {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(`http://localhost:8000/question/downvote/${card._id}/${login._id}`, {
        headers,
      })
      .then((res) => {
        if (hot === true) {
          var questions = res.data.sort(function (a, b) {
            return b.up.length - a.up.length;
          });
          setQuestion(questions);
        } else {
          setQuestion(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data! Please try again");
      });
  }

  async function refreshQuestion() {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(`http://localhost:8000/question/`, {
        headers,
      })
      .then((res) => {
        if (hot === true) {
          var questions = res.data.sort(function (a, b) {
            return b.up.length - a.up.length;
          });
          setQuestion(questions);
        } else {
          setQuestion(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data! Please try again");
      });
  }

  async function submitAnswer() {
    postAnswer(false);
    const headers = {
      "Content-Type": "application/json",
    };

    var date = getDate();
    const body = JSON.stringify({
      qid: card._id,
      content: answer2,
      uid: login._id,
      uname: login.name,
      time: date,
    });
    axios
      .post("http://localhost:8000/answer/new", body, { headers })
      .then((res) => {
        setAnswers(res.data);
        refreshQuestion();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="questionCard">
        <div>
          <span className="questionTopic">{card.space}</span>
        </div>
        <div className="question2">
          <div className="questionInfo">
            <div className="questionName">{card.creatorName}</div>
            <div className="date">{card.time}</div>
          </div>
          <div className="question">
            <div
              onClick={() =>
                history.push({
                  pathname: "/question",
                  state: { card },
                })
              }
              className="questionHeader"
            >
              {card.title}
            </div>
            <div>
              <div ref={inputEl} className={`questionContent ${toggledClass}`}>
                {card.content}
              </div>
              {overflow ? (
                <button onClick={() => setExpanded(!expanded)}>{expanded===true? "View Less" : "View More"}</button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          {len === 0 ? (
            <div className="upvote">
              &#9651; Upvote ({card.up !== undefined ? card.up.length : ""})
            </div>
          ) : len !== 0 && card.up.includes(login._id) ? (
            <div className="upvote" onClick={() => downVote()}>
              &#9650; Upvote ({card.up !== undefined ? card.up.length : ""})
            </div>
          ) : (
            <div className="upvote" onClick={() => upVote()}>
              &#9651; Upvote ({card.up !== undefined ? card.up.length : ""})
            </div>
          )}
          <div
            className="answer"
            onClick={() => {
              postAnswer(false);
              toggleAnswer();
            }}
          >
            &#9998; Answer (
            {card.answer !== undefined ? card.answer.length : ""})
          </div>
        </div>
      </div>
      {answer === index
        ? answers.map((card) => (
            <AnswerCard
              key={card._id}
              card={card}
              login={login}
              changeAnswers={changeAnswers}
              setQuestion={setQuestion}
            />
          ))
        : " "}
      {answer === index && len !== 0 ? (
        <div style={{ marginLeft: "40px" }} className="questionCard">
          <div className="name">{login.name}</div>
          {isAnswer === false ? (
            <div onClick={() => postAnswer(true)} className="dummyTextbox">
              Post Your New Answer
            </div>
          ) : (
            <div>
              <textarea
                required
                value={answer2}
                onChange={(event) => setAnswer2(event.target.value)}
              ></textarea>
              <div className="submitAnswer">
                <div
                  className="submit"
                  onClick={() => {
                    submitAnswer();
                    setAnswer2("");
                  }}
                >
                  Submit
                </div>
                <div
                  className="cancel"
                  onClick={() => {
                    postAnswer(false);
                    setAnswer2("");
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
