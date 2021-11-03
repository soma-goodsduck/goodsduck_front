/* eslint-disable indent */
import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import mixpanel from "mixpanel-browser";

import styles from "./nav.module.css";
import { Flex } from "../../elements";

import { actionCreators as homeActions } from "../../redux/modules/home";
import { actionCreators as communityActions } from "../../redux/modules/community";
import { firebaseDatabase } from "../../shared/firebase";
import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const Nav = memo((props) => {
  const option = process.env.REACT_APP_TYPE === "DEV" && {
    debug: true,
  };
  mixpanel.init(process.env.REACT_APP_MIXPANEL, option);

  const dispatch = useDispatch();

  const href = window.location.href;
  const [isHome, setIsHome] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isCommunity, setIsCommunity] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [hasNewChat, setHasNewChat] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (href.includes("/chatting")) {
      setIsChat(true);
    } else if (href.includes("/community") || href.includes("/vote")) {
      setIsCommunity(true);
    } else if (href.includes("/my-profile")) {
      setIsProfile(true);
    } else {
      setIsHome(true);
    }
  }, []);

  const reqUserId = async () => {
    const result = await requestAuthData("v1/users/look-up-id");
    return result;
  };
  const fnEffect = async () => {
    const getUserId = await reqUserId();
    if (getUserId < 0) {
      if (getUserId === -201) {
        return;
      }
      history.push("/error");
      return;
    }
    setUserId(getUserId.userId);

    const usersRef = firebaseDatabase.ref(`users/${getUserId.userId}`);
    usersRef.on("value", (snapshot) => {
      setHasNewChat(snapshot.val().hasNewChat);
    });

    if (href.includes("/chatting")) {
      usersRef.update({ hasNewChat: false });
    }
  };
  useEffect(() => {
    fnEffect();

    const usersRef = firebaseDatabase.ref(`users/${userId}`);
    return () => usersRef.off();
  }, []);

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const clickIcon = async (type) => {
    const getUserData = await reqUserData();
    if (getUserData < 0) {
      if (getUserData === -201) {
        dispatch(homeActions.setLoginPopup(true));
        return;
      }
      history.push("/error");
      return;
    }

    // 커뮤니티 메뉴 기본값 설정
    dispatch(communityActions.setCommunityMenu("home"));
    window.dataLayer = window.dataLayer || [];

    switch (type) {
      case "home":
        history.push("/");
        window.dataLayer.push({ type: "home" });
        mixpanel.track("click Home");
        break;
      case "chatting":
        history.push("/chatting");
        window.dataLayer.push({ type: "chatting" });
        mixpanel.track("click Chatting");
        break;
      case "upload-item":
        history.push("/upload-item");
        window.dataLayer.push({ type: "upload-item" });
        mixpanel.track("click Upload-item");
        break;
      case "community":
        history.push("/community");
        window.dataLayer.push({ type: "community" });
        mixpanel.track("click Community");
        break;
      case "my-profile":
        history.push("/my-profile");
        window.dataLayer.push({ type: "my-profile" });
        mixpanel.track("click My-profile");
        break;
      default:
        history.push("/");
    }
  };

  return (
    <div className={styles.nav}>
      <Flex is_flex justify="space-around" align="flex-end" margin="0 0 15px 0">
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            clickIcon("home");
          }}
        >
          <div className={isHome ? styles.isHomeIcon : styles.isNotHomeIcon} />
          <span className={isHome ? styles.isHomeText : styles.isNotHomeText}>
            홈
          </span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            clickIcon("chatting");
          }}
        >
          <div className={hasNewChat ? styles.chatBadge : styles.chatBadgeZero}>
            N
          </div>
          <div className={isChat ? styles.isChatIcon : styles.isNotChatIcon} />
          <span className={isChat ? styles.isChatText : styles.isNotChatText}>
            채팅
          </span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            clickIcon("upload-item");
          }}
        >
          <div className={styles.isNotNewIcon} />
          <span className={styles.isNotNewText}>등록</span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            clickIcon("community");
          }}
        >
          <div
            className={
              isCommunity ? styles.isCommunityIcon : styles.isNotCommunityIcon
            }
          />
          <span
            className={
              isCommunity ? styles.isCommunityText : styles.isNotCommunityText
            }
          >
            커뮤/투표
          </span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            clickIcon("my-profile");
          }}
        >
          <div
            className={
              isProfile ? styles.isProfileIcon : styles.isNotProfileIcon
            }
          />
          <span
            className={
              isProfile ? styles.isProfileText : styles.isNotProfileText
            }
          >
            내 정보
          </span>
        </button>
      </Flex>
    </div>
  );
});

export default Nav;
