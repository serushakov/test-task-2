import { Route, BrowserRouter, Switch } from "react-router-dom";

import { LandingPage } from "./pages";
import { Issues } from "./pages/Issues";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:organization/:repository" component={Issues} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
