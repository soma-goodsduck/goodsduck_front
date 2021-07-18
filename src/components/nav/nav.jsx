/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./nav.module.css";

import { Flex } from "../../elements";

import { history } from "../../redux/configureStore";

import { actionCreators as userActions } from "../../redux/modules/user";

const Nav = (props) => {
  const dispatch = useDispatch();

  const href = window.location.href;

  const [isHome, setIsHome] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isCommunity, setIsCommunity] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    if (href.includes("/home")) {
      setIsHome(true);
    } else if (href.includes("/chatting")) {
      setIsChat(true);
    } else if (href.includes("/new")) {
      setIsUpload(true);
    } else if (href.includes("/community")) {
      setIsCommunity(true);
    } else if (href.includes("/profile")) {
      setIsProfile(true);
    }
  });

  const handleClick = (path) => {
    if (path === "home") {
      history.push("/home");
    } else if (path === "new") {
      history.push("/new");
    } else {
      dispatch(userActions.checkUserAction(path));
    }
  };

  return (
    <div className={styles.nav}>
      <Flex is_flex justify="space-around">
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            handleClick("home");
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
            handleClick("chatting");
          }}
        >
          <div className={isChat ? styles.isChatIcon : styles.isNotChatIcon} />
          <span className={isChat ? styles.isChatText : styles.isNotChatText}>
            채팅
          </span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            handleClick("new");
          }}
        >
          <div className={isUpload ? styles.isNewIcon : styles.isNotNewIcon} />
          <span className={isUpload ? styles.isNewText : styles.isNotNewText}>
            등록
          </span>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            handleClick("community");
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
            handleClick("profile");
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
