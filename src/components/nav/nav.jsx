/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./nav.module.css";
import { Flex } from "../../elements";

import { actionCreators as communityActions } from "../../redux/modules/community";
import { firebaseDatabase } from "../../shared/firebase";
import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const Nav = (props) => {
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
    } else if (href.includes("/community")) {
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

  const removeFreeMarketState = () => {
    dispatch(communityActions.setCommunityMenu("home"));
  };

  return (
    <div className={styles.nav}>
      <Flex is_flex justify="space-around" align="flex-end" margin="0 0 15px 0">
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            history.push("/");
            removeFreeMarketState();
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
            history.push("/chatting");
            removeFreeMarketState();
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
            history.push("/upload-item");
            removeFreeMarketState();
          }}
        >
          <div className={styles.isNotNewIcon} />
          <span className={styles.isNotNewText}>등록</span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            history.push("/community");
            removeFreeMarketState();
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
            커뮤니티
          </span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            history.push("/my-profile");
            removeFreeMarketState();
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
};

export default Nav;
