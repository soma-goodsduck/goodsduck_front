import React from "react";
import "./app.css";
import "./reset.css";
import "./normalize.css";

import { Route } from "react-router-dom";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import home from "./pages/home/home";
import Header from "./components/header";
import OAuth2RedirectHandler from "./shared/OAuth2RedirectHandler";

import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import { Grid } from "./elements/index";
//import SocialLogin from "./pages/login/socialLogin";

function App() {
  return (
    <Grid>
      <ConnectedRouter history={history}>
        <Header></Header>
        <Route path="/" exact component={home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route
          path="/auth/kakao/callback"
          exact
          component={OAuth2RedirectHandler}
        />
        <Route
          path="/auth/naver/callback"
          exact
          component={OAuth2RedirectHandler}
        />
      </ConnectedRouter>
    </Grid>
  );
}

export default App;
