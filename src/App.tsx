import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";

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
      <Route path="/"></Route>
    </BrowserRouter>
  );
}

export default App;
