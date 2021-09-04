/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./nav.module.css";

import { Flex } from "../../elements";

import { history } from "../../redux/configureStore";

const Nav = (props) => {
  const href = window.location.href;

  const [isHome, setIsHome] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isCommunity, setIsCommunity] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const hasNewChat = useSelector((state) => state.home.hasNewChat);

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
  });

  return (
    <div className={styles.nav}>
      <Flex is_flex justify="space-around" align="flex-end" margin="0 0 15px 0">
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            history.push("/");
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
          }}
        >
          <div className={styles.isNotNewIcon} />
          <span className={styles.isNotNewText}>등록</span>
        </button>
        {/* <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            history.push("/community");
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
        </button> */}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => {
            history.push("/my-profile");
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
