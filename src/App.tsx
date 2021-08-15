import { Route, BrowserRouter, Switch } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nProvider";

import { LandingPage } from "./pages";
import { Issues } from "./pages/Issues";

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/:organization/:repository" component={Issues} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
