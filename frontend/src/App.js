import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import QuestionDetail from "./Pages/QuestionDetail/QuestionDetail";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";

function App() {
  const [login, setLogin] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [question, setquestion] = useState([]);
  const [search, setSearch] = useState("");
  const [space, setSpace] = useState("");
  const [hot, setHot] = useState(false);

  const authenticate = (data) => {
    setLogin(data);
  };

  const setQuestion = (data) => {
    setquestion(data);
  };

  const searchBox = (data) => {
    setSearch(data);
  };

  const setTopic = (data) => {
    setSpace(data);
  };

  const toggleHot = (data) => {
    setHot(data);
  };

  return (
    <Router>
      <Route
        path="/"
        exact={true}
        render={(props) => (
          <HomePage
            login={login}
            authenticate={authenticate}
            question={question}
            setQuestion={setQuestion}
            search={search}
            searchBox={searchBox}
            space={space}
            setTopic={setTopic}
            hot={hot}
            toggleHot={toggleHot}
          />
        )}
      />
      <Route
        path="/ask"
        exact={true}
        render={(props) => (
          <AskQuestion
            login={login}
            setQuestion={setQuestion}
            toggleHot={toggleHot}
          />
        )}
      />
      <Route
        path="/question"
        exact={true}
        render={(props) => (
          <QuestionDetail login={login} setQuestion={setQuestion} toggleHot={toggleHot}/>
        )}
      />
      <Route
        path="/login"
        exact={true}
        render={(props) => (
          <Login
            login={login}
            authenticate={authenticate}
            question={question}
            setQuestion={setQuestion}
            search={search}
            searchBox={searchBox}
            space={space}
            setTopic={setTopic}
            hot={hot}
            toggleHot={toggleHot}
          />
        )}
      />
      <Route
        path="/register"
        exact={true}
        render={(props) => (
          <Register
            login={login}
            authenticate={authenticate}
            question={question}
            setQuestion={setQuestion}
            search={search}
            searchBox={searchBox}
            space={space}
            setTopic={setTopic}
            hot={hot}
            toggleHot={toggleHot}
          />
        )}
      />
    </Router>
  );
}

export default App;
