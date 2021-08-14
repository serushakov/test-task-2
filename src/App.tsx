import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import { Octokit } from "octokit";

const octokitClient = new Octokit();

function App() {
  useEffect(() => {
    octokitClient.rest.users
      .getByUsername({ username: "serushakov" })
      .then((user) => console.log(user));
  }, []);

  return (
    <BrowserRouter>
      <Route path="/">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Route>
    </BrowserRouter>
  );
}

export default App;
