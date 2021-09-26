/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import App from "./app";
import "@fortawesome/fontawesome-free/js/all.js";

if (process.env.REACT_APP_SENTRY) {
  Sentry.init({
    dsn:
      process.env.REACT_APP_TYPE === "PROD"
        ? process.env.REACT_APP_SENTRY
        : false,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
