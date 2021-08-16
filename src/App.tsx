import { Route, BrowserRouter, Switch } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nProvider";

import { Landing } from "./pages/Landing";
import { Issues } from "./pages/Issues";
import { IssueView } from "./pages/IssueView";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/:organization/:repository" component={Issues} />
          <Route
            exact
            path="/:organization/:repository/issues/:number"
            component={IssueView}
          />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
