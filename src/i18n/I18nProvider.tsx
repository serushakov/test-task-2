import React from "react";
import { IntlProvider } from "react-intl";

import enMessages from "./messages/en.json";

const I18nProvider: React.FC = ({ children }) => {
  return (
    <IntlProvider messages={enMessages} locale="en">
      {children}
    </IntlProvider>
  );
};

export { I18nProvider };
