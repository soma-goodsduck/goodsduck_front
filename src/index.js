import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./index.css";
import { Provider } from "react-redux";
import App from "./app";

import store from "./redux/configureStore";

Sentry.init({
  dsn: "https://4399fa9fb6d5452d9f3d6d1b993eb737@o920538.ingest.sentry.io/5866178",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
