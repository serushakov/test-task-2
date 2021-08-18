import { Route, BrowserRouter, Switch } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nProvider";

import { Landing } from "./pages/Landing";
import { IssuesViewWrapper } from "./pages/IssuesViewWrapper";
import { IssueDetailsViewWrapper } from "./pages/IssueDetailsViewWrapper";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/:organization/:repository"
            component={IssuesViewWrapper}
          />
          <Route
            exact
            path="/:organization/:repository/issues/:number"
            component={IssueDetailsViewWrapper}
          />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
