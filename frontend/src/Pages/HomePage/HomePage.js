import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../Containers/NavBar/NavBar";
import "./HomePage.css";
import axios from "axios";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";

export default function HomePage(props) {
  const [answer, setAnswer] = useState(-1);
  const len = Object.keys(props.login).length;
  const history = useHistory();

  useEffect(async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get("http://localhost:8000/question/", { headers })
      .then((res) => {
        props.setQuestion(res.data);
      })
      .catch((err) => {
        alert("Error fetching data! Please try again");
      });
  }, []);

  const showAnswer = (data) => {
    setAnswer(data);
  };

  var x;

  if (props.space === "") {
    x = props.question;
  } else {
    x = [...props.question].filter(function (topic) {
      return topic.space === props.space;
    });
  }

  if (props.search !== "") {
    x = x.filter(function (query) {
      return query.title.toLowerCase().includes(props.search.toLowerCase());
    });
  }
  return (
    <NavBar
      login={props.login}
      authenticate={props.authenticate}
      question={props.question}
      setQuestion={props.setQuestion}
      search={props.search}
      searchBox={props.searchBox}
      space={props.space}
      setTopic={props.setTopic}
      hot={props.hot}
      toggleHot={props.toggleHot}
    >
      {len !== 0 ? (
        <div className="askQuestion">
          <div
            onClick={() => history.push("/ask")}
            className="questionTopic position"
          >
            Ask Question
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flexContainer">
        <div className="spaceHome">
          <div
            onClick={() => props.setTopic("Algorithm")}
            className="topic"
            style={{
              fontWeight: props.space === "Algorithm" ? "bold" : "normal",
            }}
          >
            Algorithm
          </div>
          <div
            onClick={() => props.setTopic("Machine Learning")}
            className="topic"
            style={{
              fontWeight:
                props.space === "Machine Learning" ? "bold" : "normal",
            }}
          >
            Machine Learning
          </div>
          <div
            onClick={() => props.setTopic("System")}
            className="topic"
            style={{
              fontWeight: props.space === "System" ? "bold" : "normal",
            }}
          >
            System
          </div>
          <div
            onClick={() => props.setTopic("JavaScript")}
            className="topic"
            style={{
              fontWeight: props.space === "JavaScript" ? "bold" : "normal",
            }}
          >
            JavaScript
          </div>
        </div>
        <div className="questionContainerHome">
          {len !== 0 ? (
            <div
              onClick={() => history.push("/ask")}
              style={{ cursor: "pointer" }}
              className="questionCardHome"
            >
              <div className="name">{props.login.name}</div>
              <div className="dummyTextbox">Post Your New Question</div>
            </div>
          ) : (
            ""
          )}
          {x.map((card) => (
            <QuestionCard
              index={card._id}
              key={card._id}
              card={card}
              answer={answer}
              showAnswer={showAnswer}
              login={props.login}
              setQuestion={props.setQuestion}
              hot={props.hot}
            />
          ))}
        </div>
      </div>
    </NavBar>
  );
}
