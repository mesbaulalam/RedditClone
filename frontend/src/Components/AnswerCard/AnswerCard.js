import React from "react";
import "./AnswerCard.css";
import axios from "axios";

export default function AnswerCard({
  card,
  login,
  changeAnswers,
  setQuestion,
  del
}) {
  async function updateQuestion() {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get("http://localhost:8000/question", {
        headers,
      })
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data! Please try again");
      });
  }

  async function deleteAnswer() {
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(`http://localhost:8000/answer/delete/${card._id}/${card.qid}`, {
        headers,
      })
      .then((res) => {
        changeAnswers(res.data);
        updateQuestion();
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data! Please try again");
      });
  }

  return (
    <div style={{ marginLeft: "40px" }} className="questionCard">
      <div className="nameDateFlex">
        <div className="detailName">{card.uname}</div>
        <div className="date">posted on {card.time}</div>
        {card.uid === login._id && del==="del"? (
          <div onClick={() => deleteAnswer()} className="answerDelete">
            Delete
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="detailContent">{card.content}</div>
    </div>
  );
}
