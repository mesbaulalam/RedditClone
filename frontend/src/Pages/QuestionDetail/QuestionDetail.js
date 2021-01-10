import React, { useEffect, useState } from "react";
import "./QuestionDetail.css";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import AnswerCard from "../../Components/AnswerCard/AnswerCard";

export default function QuestionDetail({ login, setQuestion, toggleHot }) {
  const location = useLocation();
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [card, setCard] = useState(location.state.card || {});
  const [title, setTitle] = useState(card.title);
  const [topic, settopic] = useState(card.space);
  const [content, setContent] = useState(card.content);
  const [isAnswer, postAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const len = Object.keys(login).length;
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

  useEffect(async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`http://localhost:8000/answer/${card._id}`, { headers })
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => {
        alert("Error fetching data! Please try again");
      });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setEdit(false);
    var date = getDate();
    const body = JSON.stringify({
      _id: card._id,
      space: topic,
      title: title,
      content: content,
      time: date,
      creatorid: login._id,
      creatorName: login.name,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:8000/question/edit", body, { headers })
      .then((res) => {
        var result = res.data.filter((obj) => {
          return obj._id === card._id;
        });
        setCard(result[0]);
        setQuestion(res.data);
      })
      .catch((err) => {
        alert("Error posting! Please try again");
      });
  }

  async function deleteQuestion() {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      answer: card.answer,
    });
    axios
      .post(`http://localhost:8000/question/delete/${card._id}`, body, {
        headers,
      })
      .then((res) => {
        history.push("/");
        setQuestion(res.data);
      })
      .catch((err) => {
        alert("Error fetching data! Please try again");
      });
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
        var result = res.data.filter((obj) => {
          return obj._id === card._id;
        });
        setCard(result[0]);
        setQuestion(res.data);
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
        var result = res.data.filter((obj) => {
          return obj._id === card._id;
        });
        setCard(result[0]);
        setQuestion(res.data);
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
        var result = res.data.filter((obj) => {
          return obj._id === card._id;
        });
        setCard(result[0]);
        setQuestion(res.data);
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
      content: answer,
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
        alert("Error posting! Please try again");
      });
  }

  return (
    <div>
      <span
        className="back"
        onClick={() => {
          toggleHot(false);
          history.push("/");
        }}
      >
        back
      </span>
      <div className="questionCard">
        {edit === false ? (
          <div>
            <div className="detailFlex1">
              {len === 0 ? (
                <div className="upvoteDetail">
                  &#9651; Upvote ({card.up !== undefined ? card.up.length : ""})
                </div>
              ) : len !== 0 && card.up.includes(login._id) ? (
                <div  className="upvoteDetail"onClick={() => downVote()}>
                  &#9650; Upvote ({card.up !== undefined ? card.up.length : ""})
                </div>
              ) : (
                <div  className="upvoteDetail"onClick={() => upVote()}>
                  &#9651; Upvote ({card.up !== undefined ? card.up.length : ""})
                </div>
              )}
              {len !== 0 && login._id === card.creatorid ? (
                <div className="detailFlex1Item">
                  <span onClick={() => setEdit(true)}>Edit</span>
                  <span onClick={() => deleteQuestion()}>Delete</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <span className="detailTopic">{card.space}</span>
            </div>
            <div className="nameDateFlex">
              <div className="detailName">{card.creatorName}</div>
              <div className="date">posted on {card.time}</div>
            </div>
            <div className="detailHeader">{card.title}</div>
            <div className="detailContent">{card.content}</div>
          </div>
        ) : (
          <form onSubmit={(event) => onSubmit(event)}>
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              required
            />
            <div className="space">Space</div>
            <div className="radioContainer">
              <input
                type="radio"
                onChange={(event) => settopic(event.target.value)}
                id="algorithm"
                name="space"
                value="Algorithm"
                checked={topic === "Algorithm"}
              />
              <label for="algorithm">Algorithm</label>
              <input
                type="radio"
                onChange={(event) => settopic(event.target.value)}
                id="machineLearning"
                name="space"
                value="Machine Learning"
                checked={topic === "Machine Learning"}
              />
              <label for="machineLearning">Machine Learning</label>
              <input
                type="radio"
                onChange={(event) => settopic(event.target.value)}
                id="system"
                name="space"
                value="System"
                checked={topic === "System"}
              />
              <label for="system">System</label>
              <input
                type="radio"
                onChange={(event) => settopic(event.target.value)}
                id="javascript"
                name="space"
                value="JavaScript"
                checked={topic === "JavaScript"}
              />
              <label for="javascript">JavaScript</label>
            </div>
            <br></br>
            <label for="content">Content</label>
            <textarea
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <input className="submitQuestion" type="submit" value="Submit" />
          </form>
        )}
      </div>
      {answers.map((card) => (
        <AnswerCard
          key={card._id}
          card={card}
          login={login}
          changeAnswers={changeAnswers}
          setQuestion={setQuestion}
          del="del"
        />
      ))}
      {len !== 0 ? (
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
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              ></textarea>
              <div className="submitAnswer">
                <div className="submit"
                  onClick={() => {
                    submitAnswer();
                    setAnswer("");
                  }}
                >
                  Submit
                </div>
                <div className="cancel"
                  onClick={() => {
                    postAnswer(false);
                    setAnswer("");
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
