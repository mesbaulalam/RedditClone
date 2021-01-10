import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../../Containers/NavBar/NavBar";
import "./Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function onSubmit(event) {
    event.preventDefault();
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:8000/api/authenticate", body, { headers })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user",JSON.stringify(res.data))
          props.authenticate(JSON.parse(localStorage.getItem("user")))
          history.push("/");
        } else {
          console.log(res.error);
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        setPassword("");
        alert(err.response.data);
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
    >
      <div className="authContainer">
        <div className="authBox">
          <div className="loginBox">
            <div className="authHeader">Sign in</div>
            <form onSubmit={(event) => onSubmit(event)}>
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
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              <input className="submitButton" type="submit" value="Log In" />
            </form>
          </div>
          <div className="registerBox">
            <div>Do not have an account?</div>
            <Link to="/register">
              <button className="register">Register?</button>
            </Link>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
