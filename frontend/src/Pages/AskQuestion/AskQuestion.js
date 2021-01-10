import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./AskQuestion.css";
import axios from "axios";

export default function AskQuestion(props) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [space, setSpace] = useState("");

  function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (space === "") {
      alert("Please fill space before submitting");
      return;
    }
    var date = getDate();
    const body = JSON.stringify({
      space: space,
      title: title,
      content: content,
      time: date,
      creatorid: props.login._id,
      creatorName: props.login.name,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:8000/question/ask", body, { headers })
      .then((res) => {
        if (res.status === 200) {
          alert("Question posted successfully!");
          setTitle("");
          setContent("");
          setSpace("");
          props.setQuestion(res.data);
        } else {
          const error = new Error(res.error);
          throw error;
        }
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
          props.toggleHot(false);
          history.push("/");
        }}
      >
        back
      </span>
      <div className="askQuestionContainer">
        <div className="askQuestionBox">
          <div className="askQuestionHeader">Ask your question</div>
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
                onChange={(event) => setSpace(event.target.value)}
                id="algorithm"
                name="space"
                value="Algorithm"
              />
              <label for="algorithm">Algorithm</label>
              <input
                type="radio"
                onChange={(event) => setSpace(event.target.value)}
                id="machineLearning"
                name="space"
                value="Machine Learning"
              />
              <label for="machineLearning">Machine Learning</label>
              <input
                type="radio"
                onChange={(event) => setSpace(event.target.value)}
                id="system"
                name="space"
                value="System"
              />
              <label for="system">System</label>
              <input
                type="radio"
                onChange={(event) => setSpace(event.target.value)}
                id="javascript"
                name="space"
                value="JavaScript"
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
        </div>
      </div>
    </div>
  );
}
