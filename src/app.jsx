/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable indent */
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
import FindEmailOrPwPage from "./pages/login/findEmailOrPwPage";
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
import CommentReportPage from "./pages/report/commentReportPage";
import ErrorPage from "./pages/error/errorPage";
import NotFoundPage from "./pages/error/notFoundPage";
import NoticePage from "./pages/notice/noticePage";
import TermServicePage from "./pages/myProfilePage/termServicePage";
import TermPrivacyPage from "./pages/myProfilePage/termPrivacyPage";
import TermMarketingPage from "./pages/myProfilePage/termMarketingPage";
import CommunityHomePage from "./pages/community/communityHomePage";
import CommunityMenu from "./pages/community/communityMenu";
import postDetailPage from "./pages/community/postDetail/postDetailPage";
import postUploadPage from "./pages/community/postUpload/postUploadPage";
import PostReportPage from "./pages/report/postReportPage";
import VotePage from "./pages/votePage/votePage";
import AppDownloadPopup from "./elements/appDownloadPopup";

import { Notification, Flex } from "./elements/index";
import { firebaseApp } from "./shared/firebase";
import { sendTokenAction } from "./shared/axios";

import { actionCreators as userActions } from "./redux/modules/user";
import { history } from "./redux/configureStore";

function App() {
  const userAgent = window.navigator.userAgent;

  const isChrome = userAgent.indexOf("Chrome");
  const isChromeMobile = userAgent.indexOf("CriOS");
  const isKakaoTalk = userAgent.indexOf("KAKAOTALK");
  const isAndroidWeb = userAgent.indexOf("Android");
  const isIosWeb = userAgent.indexOf("iPhone");
  const isApp = userAgent.indexOf("APP");

  const [showNoti, setShowNoti] = useState(false);
  const [notiInfo, setNotiInfo] = useState(null);
  const [notiUrl, setNotiUrl] = useState("");

  const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const showAppPopupTimeLS = localStorage.getItem("showAppPopupTime");

  // MOBILE WEB => App Download
  useEffect(() => {
    if (isApp === -1) {
      if (isIosWeb !== -1 || isAndroidWeb !== -1) {
        if (showAppPopupTimeLS) {
          const betweenTime = Math.floor(
            (new Date().getTime() - new Date(showAppPopupTimeLS).getTime()) /
              1000 /
              60,
          );
          if (betweenTime > 86400) {
            setShowAppDownloadPopup(true);
          }
        } else {
          setShowAppDownloadPopup(true);
        }
      }

      if (isIosWeb !== -1) {
        setDownloadLink("https://apps.apple.com/kr/app/goodsduck/id1586463391");
      } else if (isAndroidWeb !== -1) {
        setDownloadLink(
          "https://play.google.com/store/apps/details?id=com.goodsduck_app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
        );
      }
    }
  }, []);

  // WEB Notification
  if (isApp === -1) {
    if (isKakaoTalk === -1) {
      if (isChrome !== -1 || isChromeMobile !== -1) {
        const firebaseMessaging = firebaseApp.messaging();

        firebaseMessaging.onMessage((payload) => {
          if (process.env.REACT_APP_TYPE === "DEV") {
            console.log(payload);
          }

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

          setNotiInfo(payload.notification.body);
          setNotiUrl(payload.notification.click_action);

          if (payload.data.type === "LEVEL_UP") {
            setTimeout(() => {
              setShowNoti(true);
            }, 3000);

            setTimeout(() => {
              setShowNoti(false);
            }, 8000);
          } else {
            setShowNoti(true);
            setTimeout(() => {
              setShowNoti(false);
            }, 3000);
          }
        });
      }
    }
  }

  const reqSendFcmToken = async (data) => {
    const result = await sendTokenAction(data);
    return result;
  };
  const listener = async (event) => {
    const { data, type } = JSON.parse(event.data);

    switch (type) {
      case "TOKEN":
        const sendFcmToken = await reqSendFcmToken(data);

        if (sendFcmToken < 0) {
          if (sendFcmToken === -201) {
            history.push("/login");
            return;
          }
          history.push("/error");
        }
        break;
      case "BACK_ANDROID":
        const href = window.location.href.split("/");
        const menu = href[href.length - 1];

        if (!history.location.key || menu === "") {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_EXIT_ANDROID" }),
          );
        } else {
          history.goBack();
        }
        break;
      default:
        history.push("/error");
    }
  };
  const RNListener = () => {
    if (isApp !== -1) {
      /** android */
      document.addEventListener("message", listener);
      /** ios */
      window.addEventListener("message", listener);
    }
  };
  useEffect(() => {
    RNListener();

    return () => {
      document.removeEventListener("message", listener, true);
      window.removeEventListener("message", listener, true);
    };
  }, []);

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

  useEffect(() => {
    if (typeof navigator.share === "undefined") {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_API_KEY);
    }
  }, []);

  return (
    <>
      {showAppDownloadPopup && (
        <AppDownloadPopup
          downloadLink={downloadLink}
          handleExitClcik={() => {
            setShowAppDownloadPopup(false);
            localStorage.setItem("showAppPopupTime", new Date());
          }}
        />
      )}
      <Flex is_col align="center" style={{ width: "400px", height: "700px" }}>
        <div className={styles.appImg} />
        <div className={styles.appDownloadBtns}>
          <a
            href="https://apps.apple.com/kr/app/goodsduck/id1586463391"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={styles.appDownloadForIos}
              alt="Get Goodsduck on App Store"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.goodsduck_app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={styles.appDownloadForAndroid}
              alt="Get Goodsduck on Google Play"
            />
          </a>
        </div>
      </Flex>
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
            {/* 커뮤니티 */}
            <Route path="/community" exact component={CommunityHomePage} />
            <Route path="/community-menu" exact component={CommunityMenu} />
            <Route path="/post/:id" exact component={postDetailPage} />
            <Route path="/upload-post" exact component={postUploadPage} />
            <Route path="/report/posts/:id" exact component={PostReportPage} />
            <Route
              path="/report/comments/:id"
              exact
              component={CommentReportPage}
            />
            <Route path="/vote" exact component={VotePage} />

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
