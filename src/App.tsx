import { Route, BrowserRouter, Switch } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nProvider";

import { Landing } from "./pages/Landing";
import { IssuesPage } from "./pages/IssuesPage";
import { IssueDetailsPage } from "./pages/IssueDetailsPage";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/:organization/:repository"
            component={IssuesPage}
          />
          <Route
            exact
            path="/:organization/:repository/issues/:number"
            component={IssueDetailsPage}
          />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
