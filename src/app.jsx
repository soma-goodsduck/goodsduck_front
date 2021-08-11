import React from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import styles from "./app.module.css";
import "./reset.css";
import "./normalize.css";

import OAuth2RedirectHandler from "./shared/OAuth2RedirectHandler";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import home from "./pages/home/home";
import KeywordSearch from "./pages/home/keywordSearch";
import Filtering from "./pages/filtering/filteringPage";
import FilterItemCategory from "./pages/filtering/itemCategory";
import FilterItemStatus from "./pages/filtering/itemStatus";
import FilterIdolMember from "./pages/filtering/idolMemberSelect";
import Chatting from "./pages/chatting/chatting";
import ChatRoom from "./pages/chatting/chatRoom/chatRoom";
import Setting from "./pages/myProfilePage/setting";
import MyProfile from "./pages/myProfilePage/myProfilePage";
import EditProfile from "./pages/myProfilePage/editProfilePage";
import LikeItemList from "./pages/likeItemList/likeItemList";
import NotificationPage from "./pages/notification/notificationPage";
import ItemDetailPage from "./pages/itemDetail/itemDetailPage";
import ItemUploadPage from "./pages/itemUpload/itemUploadPage";
import ItemCategory from "./pages/itemUpload/itemCategory";
import ItemStatus from "./pages/itemUpload/itemStatus";
import IdolGroup from "./pages/itemUpload/idolSelect";
import IdolMember from "./pages/itemUpload/idolMeberSelect";
import PriceProposeListPage from "./pages/price/priceProposeListPage";
import PriceProposePage from "./pages/myProfilePage/priceProposePage";
import ReviewPage from "./pages/myProfilePage/reviewPage";
import WritingReviewPage from "./pages/review/writingReviewPage";
import OtherProfilePage from "./pages/otherProfilePage/otherProfilePage";

import { history } from "./redux/configureStore";

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
        <Route path="/search/item/:name" exact component={KeywordSearch} />
        <Route path="/chatting" exact component={Chatting} />
        <Route path="/chat-room/:id" exact component={ChatRoom} />
        <Route path="/my-profile" exact component={MyProfile} />
        <Route path="/review/:id" exact component={WritingReviewPage} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/edit-profile" exact component={EditProfile} />
        <Route path="/price-proposes" exact component={PriceProposePage} />
        <Route path="/reviews" exact component={ReviewPage} />
        <Route path="/favorites" exact component={LikeItemList} />
        <Route path="/price/:id" exact component={PriceProposeListPage} />
        <Route path="/notification" exact component={NotificationPage} />
        <Route path="/item/:id" exact component={ItemDetailPage} />
        <Route path="/profile/:id" exact component={OtherProfilePage} />
        {/* 아이템 등록 */}
        <Route path="/upload-item" exact component={ItemUploadPage} />
        <Route path="/category" exact component={ItemCategory} />
        <Route path="/status" exact component={ItemStatus} />
        <Route path="/select-idol" exact component={IdolGroup} />
        <Route path="/select-idol-member" exact component={IdolMember} />
        {/* 필터링 */}
        <Route path="/filtering" exact component={Filtering} />
        <Route path="/filter-category" exact component={FilterItemCategory} />
        <Route path="/filter-status" exact component={FilterItemStatus} />
        <Route
          path="/filter-select-idol-member"
          exact
          component={FilterIdolMember}
        />
      </ConnectedRouter>
    </div>
  );
}

export default App;
