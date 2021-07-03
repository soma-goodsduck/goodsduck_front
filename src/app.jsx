import React from "react";
import "./app.css";
import "./reset.css";
import "./normalize.css";

import { Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Test from "./pages/socialLogin";
import Main from "./pages/main";
import Header from "./components/header";

import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import { Grid } from "./elements/index";

function App() {
  return (
    <Grid>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/auth/kakao/callback" exact component={Test} />
      </ConnectedRouter>
    </Grid>
  );
}

export default App;
