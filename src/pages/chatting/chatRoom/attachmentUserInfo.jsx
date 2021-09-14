/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

import styled from "styled-components";
import { Notification } from "../../../elements";

import { firebaseDatabase } from "../../../shared/firebase";
import { requestAuthData, postAction } from "../../../shared/axios";
import { history } from "../../../redux/configureStore";

const AttachmentUserInfo = (props) => {
  const { type, text, _onClickExit } = props;

  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];

  const messagesRef = firebaseDatabase.ref("messages");
  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [addressInfo, setAddressInfo] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const reqUserId = async () => {
    const result = await requestAuthData("v1/users/look-up-id");
    return result;
  };
  const reqAddress = async () => {
    const result = await requestAuthData("v1/users/address");
    return result;
  };
  const reqAccount = async () => {
    const result = await requestAuthData("v1/users/account");
    return result;
  };
  const fnEffect = async () => {
    const getAddress = await reqAddress();
    const getAccount = await reqAccount();
    const getUserId = await reqUserId();

    if (getAddress < 0 || getAccount < 0 || getUserId < 0) {
      if (getAddress === -101) {
        setAddressInfo("등록해주세요 :D");
      }
      if (getAccount === -101) {
        setAccountInfo("등록해주세요 :D");
      }

      if (getAddress === -999 || getAccount === -999 || getUserId === -999) {
        history.push("/error");
        return;
      }
    }

    setUserId(getUserId.userId);
    setUserNick(getUserId.nickName);
    setAddressInfo(
      `${getAddress.detailAddress} ${getAddress.phoneNumber} ${getAddress.name}`,
    );
    setAccountInfo(
      `(${getAccount.bank}) ${getAccount.accountNumber} ${getAccount.name}`,
    );
  };
  useEffect(fnEffect, []);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }, [showPopup]);

  const reqSendNoti = async (notiJson) => {
    const result = await postAction("v2/chat/notification", notiJson);
    return result;
  };

  const createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: userId,
        name: userNick,
      },
    };

    if (type === "address") {
      message["content"] = addressInfo;
    } else if (type === "account") {
      message["content"] = accountInfo;
    }

    _onClickExit();
    return message;
  };

  const handleSubmit = async () => {
    const key = messagesRef.child(chatRoomId).push().key;
    await messagesRef.child(chatRoomId).child(key).update(createMessage());

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

    const sendNoti = await reqSendNoti(notiJson);
    if (sendNoti < 0) {
      if (sendNoti === -101) {
        setShowPopup(true);
      }
      history.push("/error");
    }
  };

  return (
    <>
      {showPopup && (
        <Notification data="상대방이 존재하지 않거나 굿즈가 삭제되어 메세지를 보낼 수 없습니다." />
      )}
      <AttachmentUserInfoBox>
        <BtnBox>
          <Btns>
            <Button1
              onClick={() => {
                handleSubmit();
              }}
            >
              {type === "address" ? addressInfo : accountInfo}
            </Button1>
            <Button2
              onClick={() => {
                history.push("/edit-personal-information");
              }}
            >
              {text} 수정하기
            </Button2>
          </Btns>
          <ExitBtn onClick={_onClickExit}>닫기</ExitBtn>
        </BtnBox>
      </AttachmentUserInfoBox>
    </>
  );
};

const AttachmentUserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 150%;
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
`;

const Button2 = styled.button`
  padding: 15px;
`;

const ExitBtn = styled.button`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
`;
export default AttachmentUserInfo;
