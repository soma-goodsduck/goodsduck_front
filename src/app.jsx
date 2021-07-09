import React from "react";
import styles from "./app.module.css";
import "./reset.css";
import "./normalize.css";

import { Route } from "react-router-dom";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import home from "./pages/home/home";
import OAuth2RedirectHandler from "./shared/OAuth2RedirectHandler";

import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import LikeItemList from "./pages/likeItemList/likeItemList";
import Notification from "./pages/notification/notification";

function App() {
  return (
    <div className={styles.app}>
      <ConnectedRouter history={history}>
        <Route path="/home" exact component={home} />
        <Route path="/" exact component={Login} />
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
        <Route path="/favorites" exact component={LikeItemList} />
        <Route path="/notification" exact component={Notification} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
