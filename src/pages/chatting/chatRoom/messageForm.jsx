/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import firebase from "firebase/app";
import styled from "styled-components";

import { Flex, Icon, Button, DoubleCheckModal2 } from "../../../elements";
import { grayBorder, white, grayBtnText } from "../../../shared/colors";

import { firebaseDatabase } from "../../../shared/firebase";
import { requestAuthData, postAction } from "../../../shared/axios";
import { actionCreators as chatActions } from "../../../redux/modules/chat";
import { history } from "../../../redux/configureStore";

const MessageForm = ({ onOpenAttachment }) => {
  const dispatch = useDispatch();

  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];
  const itemId = href[href.length - 2];

  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [patnerId, setPatnerId] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const { isItemExist, readyToSendMessage } = useSelector((state) => ({
    isItemExist: state.chat.isItemExist,
    readyToSendMessage: state.chat.readyToSendMessage,
  }));
  const messagesRef = firebaseDatabase.ref("messages");
  const usersRef = firebaseDatabase.ref("users");

  const reqUsersFromChat = async () => {
    const result = await requestAuthData(`v1/chat/${chatRoomId}`);
    return result;
  };
  const reqUserId = async () => {
    const result = await requestAuthData("v1/users/look-up-id");
    return result;
  };
  const fnEffect = async () => {
    const getUserId = await reqUserId();
    const getUsersFromChat = await reqUsersFromChat();
    if (getUserId < 0 || getUsersFromChat < 0) {
      history.push("/error");
      return;
    }

    setUserId(getUserId.userId);
    setUserNick(getUserId.nickName);
    if (getUsersFromChat.users[0].userId === getUserId.userId) {
      setPatnerId(getUsersFromChat.users[1].userId);
    } else {
      setPatnerId(getUsersFromChat.users[0].userId);
    }
  };
  useEffect(fnEffect, []);

  useEffect(() => {
    const chatRoomRef = firebaseDatabase.ref(
      `chatRooms/${itemId}/${chatRoomId}`,
    );

    // 만약 상대방이 존재하지 않거나 아이템이 삭제된 채팅방이라면 메세지를 보낼 수 없도록 알림
    chatRoomRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (
        (data.createdBy.id !== userId &&
          data.createdBy.isPresented === false) ||
        (data.createdWith.id !== userId &&
          data.createdWith.isPresented === false) ||
        isItemExist === false
      ) {
        dispatch(chatActions.setReadyToSendMessage(false));
        setShowNotice(true);
      } else {
        dispatch(chatActions.setReadyToSendMessage(true));
      }
    });

    return () => {
      chatRoomRef.off();
      messagesRef.off();
    };
  }, []);

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
    if (!content) {
      return;
    }

    setLoading(true);

    try {
      const key = messagesRef.child(chatRoomId).push().key;
      await messagesRef.child(chatRoomId).child(key).update(createMessage());
      await usersRef.child(patnerId).update({ hasNewChat: true });

      setErrors([]);
      setContent("");
      setLoading(false);
      document.querySelector("#messageInput").focus();

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

      // 채팅방 최신순 정렬을 위한 timestamp 업데이트
      const chatRoomRef = firebaseDatabase.ref(
        `chatRooms/${itemId}/${chatRoomId}`,
      );
      chatRoomRef.update({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
    } catch (error) {
      if (process.env.REACT_APP_TYPE === "DEV") {
        console.log(error.message);
      }
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
      {showNotice && (
        <DoubleCheckModal2
          text="상대방이 존재하지 않거나 굿즈가 삭제되어 메세지를 보낼 수 없습니다."
          onOkClick={() => {
            setShowNotice(false);
          }}
        />
      )}
      {readyToSendMessage ? (
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
              src="https://goods-duck.com/icon/icon_add.svg"
              _onClick={() => {
                onOpenAttachment();
              }}
            />
            <InputBox
              placeholder="메세지를 입력하세요."
              onKeyDown={handleKeyDown}
              value={content}
              onChange={handleChange}
              id="messageInput"
            />
            <Button
              type="submit"
              width="32px"
              height="28px"
              src={
                content
                  ? "https://goods-duck.com/icon/icon_send_ready.svg"
                  : "https://goods-duck.com/icon/icon_send.svg"
              }
              disabled={loading}
              _onClick={() => {
                handleSubmit();
              }}
            />
          </Flex>
        </MessageFormBox>
      ) : (
        <MessageFormBox>
          <Flex is_flex justify="space-between" padding="20px">
            <Icon width="28px" src="https://goods-duck.com/icon/icon_add.svg" />
            <InputBoxNonUse value="채팅을 할 수 없습니다." readOnly />
            <Button
              type="submit"
              width="32px"
              height="28px"
              src="https://goods-duck.com/icon/icon_send.svg"
            />
          </Flex>
        </MessageFormBox>
      )}
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

const InputBoxNonUse = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid ${grayBorder};
  border-radius: 10px;
  margin: 0 12px;
  padding-left: 10px;
  color: ${grayBtnText};
`;

export default MessageForm;
