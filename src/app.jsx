import React from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import styles from "./app.module.css";
import "./reset.css";
import "./normalize.css";

import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import home from "./pages/home/home";
import Chatting from "./pages/chatting/chatting";
import MyPage from "./pages/myPage/myPage";
import Setting from "./pages/myPage/setting";
import MyProfile from "./pages/myPage/myProfile";
import LikeItemList from "./pages/likeItemList/likeItemList";
import Notification from "./pages/notification/notification";
import ItemDetail from "./pages/itemDetail/itemDetail";
import ItemUpload from "./pages/itemUpload/itemUpload";
import ItemCategory from "./pages/itemUpload/itemCategory";
import ItemStatus from "./pages/itemUpload/itemStatus";
import IdolGroup from "./pages/itemUpload/idolSelect";
import IdolMember from "./pages/itemUpload/idolMeberSelect";
import OAuth2RedirectHandler from "./shared/OAuth2RedirectHandler";

import { history } from "./redux/configureStore";
import PriceProposeList from "./pages/price/priceProposeList";

function App() {
  return (
    <div className={styles.app}>
      <ConnectedRouter history={history}>
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
        <Route path="/chatting" exact component={Chatting} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/myProfile" exact component={MyProfile} />
        <Route path="/favorites" exact component={LikeItemList} />
        <Route path="/price/:id" exact component={PriceProposeList} />
        <Route path="/notification" exact component={Notification} />
        <Route path="/item/:id" exact component={ItemDetail} />
        {/* 아이템 등록 */}
        <Route path="/new" exact component={ItemUpload} />
        <Route path="/category" exact component={ItemCategory} />
        <Route path="/status" exact component={ItemStatus} />
        <Route path="/idolSelect" exact component={IdolGroup} />
        <Route path="/idolMemberSelect" exact component={IdolMember} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
