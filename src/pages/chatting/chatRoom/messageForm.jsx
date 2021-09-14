/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import firebase from "firebase/app";
import styled from "styled-components";

import { Flex, Icon, Button, Notification } from "../../../elements";
import { grayBorder, white } from "../../../shared/colors";
import { firebaseDatabase } from "../../../shared/firebase";
import { requestAuthData, postAction } from "../../../shared/axios";
import { history } from "../../../redux/configureStore";

const MessageForm = ({ onOpenAttachment }) => {
  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];
  const chatRoomRef = firebaseDatabase.ref(`chatRooms/${chatRoomId}`);

  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [content, setContent] = useState("");
  const messagesRef = firebaseDatabase.ref("messages");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isItemExist = useSelector((state) => state.chat.isItemExist);

  const reqUserId = async () => {
    const result = await requestAuthData("v1/users/look-up-id");
    return result;
  };
  const fnEffect = async () => {
    const getUserId = await reqUserId();
    if (getUserId < 0) {
      history.push("/error");
      return;
    }

    setUserId(getUserId.userId);
    setUserNick(getUserId.nickName);
  };
  useEffect(fnEffect, []);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }, [showPopup]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: userId,
        name: userNick,
      },
    };

    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = content;
    }
    return message;
  };

  const handleSubmit = async () => {
    // 채팅방 최신순 정렬을 위한 timestamp 업데이트
    firebaseDatabase
      .ref(`chatRooms/${chatRoomId}`)
      .update({ timestamp: firebase.database.ServerValue.TIMESTAMP });

    // 만약 상대방이 존재하지 않거나 아이템이 삭제된 채팅방이라면 메세지를 보낼 수 없도록 알림
    let isNotChatRoom;
    chatRoomRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (
        (data.createdBy.id !== userId &&
          data.createdBy.isPresented === false) ||
        (data.createdWith.id !== userId &&
          data.createdWith.isPresented === false) ||
        !isItemExist
      ) {
        isNotChatRoom = true;
        setShowPopup(true);
      }
    });
    if (isNotChatRoom || !isItemExist) {
      return;
    }
    if (!content) {
      return;
    }
    setLoading(true);

    try {
      const key = messagesRef.child(chatRoomId).push().key;
      await messagesRef.child(chatRoomId).child(key).update(createMessage());

      setErrors([]);
      setContent("");
      setLoading(false);

      // LS에 채팅방에 방문한 시각 업데이트
      localStorage.setItem(
        `${chatRoomId}`,
        `${Math.round(new Date().getTime())}`,
      );

      const notiJson = {
        chatMessageId: key,
        chatRoomId,
        senderId: userId,
        type: "CHAT",
      };
      postAction("v2/chat/notification", notiJson);
    } catch (error) {
      console.error(error.message);
      setErrors((prev) => prev.concat(error.message));
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      {showPopup && (
        <Notification data="상대방이 존재하지 않거나 굿즈가 삭제되어 메세지를 보낼 수 없습니다." />
      )}
      <MessageFormBox onSubmit={handleSubmit}>
        <div>
          {errors.map((errorMsg) => (
            <p style={{ color: "red" }} key={errorMsg}>
              {errorMsg}
            </p>
          ))}
        </div>
        <Flex is_flex justify="space-between" padding="20px">
          <Icon
            width="28px"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg"
            _onClick={() => {
              onOpenAttachment();
            }}
          />
          <InputBox
            placeholder="메세지를 입력하세요."
            onKeyDown={handleKeyDown}
            value={content}
            onChange={handleChange}
          />
          <Button
            type="submit"
            width="32px"
            height="28px"
            src={
              content
                ? "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_send_ready.svg"
                : "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_send.svg"
            }
            disabled={loading}
            _onClick={() => {
              handleSubmit();
            }}
          />
        </Flex>
      </MessageFormBox>
    </>
  );
};

const MessageFormBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${white};
  z-index: 3;

  width: 100%;
  left: 0;

  @media screen and (min-width: 415px) {
    width: 415px;
    left: 30%;
  }

  @media screen and (min-width: 500px) {
    left: 10%;
  }

  @media screen and (min-width: 850px) {
    left: 50%;
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid ${grayBorder};
  border-radius: 10px;
  margin: 0 12px;
  padding-left: 10px;
`;

export default MessageForm;
