/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";

import styled from "styled-components";

import { Flex, Icon, Button, PopUp } from "../../../elements";

import { grayBorder, white } from "../../../shared/colors";
import { firebaseDatabase } from "../../../shared/firebase";
import { getInfo, postImgAction } from "../../../shared/axios";

const MessageForm = (props) => {
  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];
  const chatRoomRef = firebaseDatabase.ref(`chatRooms/${chatRoomId}`);

  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const styles = { isMobile };

  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [content, setContent] = useState("");
  const messagesRef = firebaseDatabase.ref("messages");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputOpenImageRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getUserId = getInfo("/users/look-up-id");
    getUserId.then((result) => {
      setUserId(result.userId);
      setUserNick(result.nickName);
    });
  });

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }, [showPopup]);

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

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
    console.log("message", message);
    return message;
  };

  const handleSubmit = async () => {
    // 채팅방 최신순 정렬을 위한 timestamp 업데이트
    firebaseDatabase
      .ref(`chatRooms/${chatRoomId}`)
      .update({ timestamp: firebase.database.ServerValue.TIMESTAMP });

    // 만약 상대방이 존재하지 않는 채팅방이라면 메세지를 보낼 수 없도록 알림
    let isNotChatRoom;
    chatRoomRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (
        (data.createdBy.id !== userId &&
          data.createdBy.isPresented === false) ||
        (data.createdWith.id !== userId &&
          data.createdWith.isPresented === false)
      ) {
        isNotChatRoom = true;
        setShowPopup(true);
      }
    });
    if (isNotChatRoom) {
      return;
    }
    if (!content) {
      return;
    }
    setLoading(true);

    try {
      await messagesRef.child(chatRoomId).push().set(createMessage());

      setErrors([]);
      setContent("");
      setLoading(false);

      // LS에 채팅방에 방문한 시각 업데이트
      localStorage.setItem(
        `${chatRoomId}`,
        `${Math.round(new Date().getTime())}`,
      );
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

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log(file);
    const formData = new FormData();
    formData.append("multipartFile", file);
    const postImg = postImgAction("users/chat-image", formData);
    postImg.then((result) => {
      messagesRef.child(chatRoomId).push().set(createMessage(result));
    });
  };

  return (
    <>
      {showPopup && <PopUp width="250px" text1="상대방이 존재하지 않습니다." />}
      <MessageFormBox {...styles} onSubmit={handleSubmit}>
        <div>
          {errors.map((errorMsg) => (
            <p style={{ color: "red" }} key={errorMsg}>
              {errorMsg}
            </p>
          ))}
        </div>
        <Flex is_flex justify="space-between" padding="20px">
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            ref={inputOpenImageRef}
            style={{ display: "none" }}
            onChange={handleUploadImage}
          />
          <Icon
            width="28px"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg"
            _onClick={() => {
              handleOpenImageRef();
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
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_send.svg"
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
  ${(props) =>
    props.isMobile ? " width: 100%; left: 0;" : "width: 415px; left: 30%;"}
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
