import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Switch } from "react-router-dom";
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
import EditUserAccountPage from "./pages/myProfilePage/editUserAccountPage";
import EditPersonalInfoPage from "./pages/myProfilePage/editPersonalInfoPage";
import WritingReviewPage from "./pages/review/writingReviewPage";
import WritingReviewBackPage from "./pages/review/writingReviewBackPage";
import OtherProfilePage from "./pages/otherProfilePage/otherProfilePage";
import OtherItemsPage from "./pages/otherProfilePage/otherItemsPage";
import UserReportPage from "./pages/report/userReportPage";
import ItemReportPage from "./pages/report/itemReportPage";
import ChattingReportPage from "./pages/report/chattingReportPage";
import ErrorPage from "./pages/error/errorPage";
import NotFoundPage from "./pages/error/notFoundPage";
import NoticePage from "./pages/notice/noticePage";
import TermServicePage from "./pages/myProfilePage/termServicePage";
import TermPrivacyPage from "./pages/myProfilePage/termPrivacyPage";
import TermMarketingPage from "./pages/myProfilePage/termMarketingPage";

import { Notification } from "./elements/index";
import { firebaseApp } from "./shared/firebase";
import { sendTokenAction } from "./shared/axios";

import { actionCreators as userActions } from "./redux/modules/user";
import { history } from "./redux/configureStore";
import FindEmailOrPwPage from "./pages/login/findEmailOrPwPage";

function App() {
  const userAgent = window.navigator.userAgent;

  const isChrome = userAgent.indexOf("Chrome");
  const isChromeMobile = userAgent.indexOf("CriOS");
  const isKakaoTalk = userAgent.indexOf("KAKAOTALK");
  const isApp = userAgent.indexOf("APP");

  const [showNoti, setShotNoti] = useState(false);
  const [notiInfo, setNotiInfo] = useState(null);
  const [notiUrl, setNotiUrl] = useState("");

  // WEB
  if (isApp === -1) {
    if (isKakaoTalk === -1) {
      if (isChrome !== -1 || isChromeMobile !== -1) {
        const firebaseMessaging = firebaseApp.messaging();

        firebaseMessaging.onMessage((payload) => {
          console.log(payload);

          const href = window.location.href.split("/");
          const chatRoomId = String(href[href.length - 1]);

          if (payload.data.type === "CHAT") {
            if (chatRoomId === payload.data.chatRoomId) {
              return;
            }

            if (chatRoomId !== "chatting") {
              localStorage.setItem("hasNewChat", true);
            }
          }

          setShotNoti(true);
          setNotiInfo(payload.notification.body);
          setNotiUrl(payload.notification.click_action);

          setTimeout(() => {
            setShotNoti(false);
          }, 5000);
        });
      }
    }
  }

  const RNListener = () => {
    const listener = (event) => {
      const { data, type } = JSON.parse(event.data);
      if (type === "TOKEN") {
        const sendFcmToken = sendTokenAction(data);
        sendFcmToken.then((result) => {
          console.log(result);
          if (result === "login") {
            history.push("/login");
          }
        });
      }
    };

    if (isApp !== -1) {
      /** android */
      document.addEventListener("message", listener);
      /** ios */
      window.addEventListener("message", listener);
    }
  };
  useEffect(() => {
    RNListener();
  });

  // alert
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const { showNotification, notificationBody } = useSelector((state) => ({
    showNotification: state.user.showNotification,
    notificationBody: state.user.notificationBody,
  }));

  useEffect(() => {
    if (showNotification) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(userActions.setShowNotification(false));
        dispatch(userActions.setNotificationBody(""));
      }, 2000);
    }
  }, [showNotification]);

  return (
    <>
      <div className={styles.appImg} />
      <div className={styles.app}>
        {showNoti && <Notification data={notiInfo} clickUrl={notiUrl} />}
        {showAlert && <Notification data={notificationBody} />}
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/login" exact component={Login} />
            <Route path="/find-email-pw" exact component={FindEmailOrPwPage} />
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
            <Route
              path="/auth/apple/callback"
              exact
              component={OAuth2RedirectHandler}
            />
            <Route path="/search/item/:name" exact component={KeywordSearch} />
            <Route path="/chatting" exact component={Chatting} />
            <Route path="/chat-room/:id/:id" exact component={ChatRoom} />
            <Route path="/my-profile" exact component={MyProfile} />
            <Route path="/review/:id" exact component={WritingReviewPage} />
            <Route
              path="/review-back/:id"
              exact
              component={WritingReviewBackPage}
            />
            <Route path="/setting" exact component={Setting} />
            <Route path="/edit-profile" exact component={EditProfile} />
            <Route
              path="/edit-user-account"
              exact
              component={EditUserAccountPage}
            />
            <Route
              path="/edit-personal-information"
              exact
              component={EditPersonalInfoPage}
            />
            <Route path="/price-proposes" exact component={PriceProposePage} />
            <Route path="/reviews" exact component={ReviewPage} />
            <Route path="/favorites" exact component={LikeItemList} />
            <Route path="/price/:id" exact component={PriceProposeListPage} />
            <Route path="/notification" exact component={NotificationPage} />
            <Route path="/item/:id" exact component={ItemDetailPage} />
            <Route path="/profile/:id" exact component={OtherProfilePage} />
            <Route path="/profile/:id/items" exact component={OtherItemsPage} />
            <Route path="/report/:id" exact component={UserReportPage} />
            <Route
              path="/report/item/:id/:id"
              exact
              component={ItemReportPage}
            />
            <Route
              path="/report/chat/:id/:id"
              exact
              component={ChattingReportPage}
            />
            <Route path="/notice" exact component={NoticePage} />
            <Route path="/service-policy" exact component={TermServicePage} />
            <Route
              path="/marketing-policy"
              exact
              component={TermMarketingPage}
            />
            <Route path="/privacy" exact component={TermPrivacyPage} />

            {/* 아이템 등록 */}
            <Route path="/upload-item" exact component={ItemUploadPage} />
            <Route path="/category" exact component={ItemCategory} />
            <Route path="/status" exact component={ItemStatus} />
            <Route path="/select-idol" exact component={IdolGroup} />
            <Route path="/select-idol-member" exact component={IdolMember} />
            {/* 필터링 */}
            <Route path="/filtering" exact component={Filtering} />
            <Route
              path="/filter-category"
              exact
              component={FilterItemCategory}
            />
            <Route path="/filter-status" exact component={FilterItemStatus} />
            <Route
              path="/filter-select-idol-member"
              exact
              component={FilterIdolMember}
            />
            {/* 에러 페이지 */}
            <Route path="/error" exact component={ErrorPage} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>
      </div>
    </>
  );
}

export default App;
