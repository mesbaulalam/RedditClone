import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  const len = Object.keys(props.login).length;
  const history = useHistory();

  function hotQuestion() {
    var questions = [...props.question].sort(function (a, b) {
      return b.up.length - a.up.length;
    });
    props.hot === false && props.toggleHot(true);
    props.setQuestion(questions);
  }

  function homeQuestion() {
    var questions = [...props.question].sort(function (a, b) {
      return Date.parse(b.time) - Date.parse(a.time);
    });
    props.hot === true && props.toggleHot(false);
    props.setQuestion(questions);
  }

  return (
    <div>
      <div className="navFlex">
        <div
          onClick={() => {
            history.push("/");
            props.setTopic("");
            homeQuestion();
          }}
          className="header"
        >
          Redev
        </div>
        <div
          onClick={() => {
            history.push("/");
            props.setTopic("");
            homeQuestion();
          }}
          style={{ fontWeight: props.hot !== true ? "bold" : "normal" }}
          className="headerItem"
        >
          Home
        </div>
        <div
          onClick={() => {
            hotQuestion();
          }}
          style={{ fontWeight: props.hot === true ? "bold" : "normal" }}
          className="headerItem"
        >
          Hot
        </div>
        <input
          className="headerItem search"
          type="text"
          id="search"
          value={props.search}
          onChange={(event) => props.searchBox(event.target.value)}
        />
        <div className="auth">
          {len === 0 ? (
            <Link className="headerItem" to="/login">
              <div>Login</div>
            </Link>
          ) : (
            ""
          )}
          {len === 0 ? (
            <Link className="headerItem" to="/register">
              <div>Register</div>
            </Link>
          ) : (
            ""
          )}
          {len !== 0 ? (
            <div
              onClick={() => {
                localStorage.removeItem("user");
                props.authenticate({});
              }}
              className="headerItem"
            >
              Logout
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {props.children}
    </div>
  );
}
