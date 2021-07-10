import React, { useEffect } from "react";
import styles from "./app.module.css";
import "./reset.css";
import "./normalize.css";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import home from "./pages/home/home";
import LikeItemList from "./pages/likeItemList/likeItemList";
import Notification from "./pages/notification/notification";
import Item from "./pages/item/item";
import OAuth2RedirectHandler from "./shared/OAuth2RedirectHandler";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loginCheckAction());
  });

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
        <Route path="/item/1" exact component={Item} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
