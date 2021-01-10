import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../Containers/NavBar/NavBar";
import axios from "axios";
import "./Register.css";

export default function Login(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  async function onSubmit(event) {
    event.preventDefault();
    if (
      document.getElementById("password").value !==
      document.getElementById("passwordConfirm").value
    ) {
      setError(true);
      return;
    } else if (error === true) {
      setError(false);
    }
    const body = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:8000/api/register", body, { headers })
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  return (
    <NavBar
      login={props.login}
      authenticate={props.authenticate}
      question={props.question}
      setQuestion = {props.setQuestion}
      search={props.search}
      searchBox={props.searchBox}
      space={props.space}
      setTopic={props.setTopic}
    >
      <div className="authContainer">
        <div className="authBox">
          <div className="loginBox">
            <div className="authHeader">Register</div>
            <form onSubmit={(event) => onSubmit(event)}>
              <label for="email">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              <label for="password">Confirmation</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirm password"
                value={passwordConfirm}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                }}
                required
              />
              <input className="submitButton" type="submit" value="Register" />
              {error === true ? (
                <div className="error">PASSWORDS DO NOT MATCH</div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
