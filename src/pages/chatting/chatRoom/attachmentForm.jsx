/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";

import styled from "styled-components";
import { Notification } from "../../../elements";
import { blackBtn } from "../../../shared/colors";

import { firebaseDatabase } from "../../../shared/firebase";
import {
  requestAuthData,
  postImgAction,
  postAction,
} from "../../../shared/axios";
import { history } from "../../../redux/configureStore";

const AttachmentForm = (props) => {
  const { _onClick1, _onClick2, _onClickExit } = props;

  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];

  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const messagesRef = firebaseDatabase.ref("messages");
  const inputOpenImageRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

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

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const reqSendNoti = async (notiJson) => {
    const result = await postAction("v2/chat/notification", notiJson);
    return result;
  };
  const createMessage = (fileUrl) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: userId,
        name: userNick,
      },
      image: fileUrl,
    };

    _onClickExit();
    return message;
  };

  const reqUploadImg = async (formData) => {
    const result = await postImgAction("v1/users/chat-image", formData);
    return result;
  };
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("multipartFile", file);

    const _uploadImg = await reqUploadImg(formData);
    if (_uploadImg < 0) {
      history.push("/error");
      return;
    }

    const key = messagesRef.child(chatRoomId).push().key;
    await messagesRef
      .child(chatRoomId)
      .child(key)
      .update(createMessage(_uploadImg));

    // LS??? ???????????? ????????? ?????? ????????????
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

    const sendNoti = await reqSendNoti(notiJson);
    if (sendNoti < 0) {
      if (sendNoti === -101) {
        setShowPopup(true);
      }
      history.push("/error");
    }

    _onClickExit();
  };

  return (
    <>
      {showPopup && (
        <Notification data="???????????? ???????????? ????????? ????????? ???????????? ???????????? ?????? ??? ????????????." />
      )}
      <AttachmentFormBox>
        <BtnBox>
          <Btns>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              ref={inputOpenImageRef}
              style={{ display: "none" }}
              onChange={handleUploadImage}
            />

            <Button1
              onClick={() => {
                handleOpenImageRef();
              }}
            >
              ?????? ????????????
            </Button1>
            <Button1 onClick={_onClick1}>????????? ?????? ????????????</Button1>
            <Button2 onClick={_onClick2}>???????????? ????????????</Button2>
          </Btns>
          <ExitBtn onClick={_onClickExit}>??????</ExitBtn>
        </BtnBox>
      </AttachmentFormBox>
    </>
  );
};

const AttachmentFormBox = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const BtnBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 20px;
`;

const Btns = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Button1 = styled.button`
  padding: 15px;
  border-bottom: 1px solid #dddddd;
  color: ${blackBtn};
`;

const Button2 = styled.button`
  padding: 15px;
  color: ${blackBtn};
`;

const ExitBtn = styled.button`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  color: ${blackBtn};
`;

export default AttachmentForm;
