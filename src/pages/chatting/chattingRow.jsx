import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "moment/locale/ko";
import moment from "moment";

import styled from "styled-components";
import { Text, Image } from "../../elements";
import { gray, grayBorder, green, white } from "../../shared/colors";

import { actionCreators as chatActions } from "../../redux/modules/chat";
import { firebaseDatabase } from "../../shared/firebase";

import { history } from "../../redux/configureStore";

const ChattingRow = ({ chatRoom, userId }) => {
  const dispatch = useDispatch();
  const [isCreatedByUser, setIsCreatedByUser] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [lastSentAt, setLastSentAt] = useState("");
  const [profileImg, setProfileImg] = useState(
    "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png",
  );
  const [chatCount, setChatCount] = useState(0);
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  const clickChatRow = () => {
    // LS에 채팅방에 방문한 시각 저장
    localStorage.setItem(
      `${chatRoom.id}`,
      `${Math.round(new Date().getTime())}`,
    );

    dispatch(chatActions.setChatRoom(chatRoom));
    history.push(`/chat-room/${chatRoom.id}`);
  };

  const getLastMessage = () => {
    const messageRef = firebaseDatabase
      .ref(`messages/${chatRoom.id}`)
      .limitToLast(1);
    messageRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const messageObj = data[Object.keys(data)[0]];
        if ("content" in messageObj) {
          setLastMessage(messageObj.content);
          setLastSentAt(messageObj.timestamp);
        } else if ("image" in messageObj) {
          setLastMessage("사진을 보냈습니다.");
          setLastSentAt(messageObj.timestamp);
        }
      }
    });
    return () => messageRef.off();
  };

  const getChatNotification = (chatRoomId) => {
    const messagesRef = firebaseDatabase.ref("messages");
    messagesRef.child(chatRoomId).on("value", (DataSnapshot) => {
      let count = 0;
      const lastVisitTime = Number(localStorage.getItem(chatRoomId));

      if (DataSnapshot.val() !== null) {
        const messageValues = Object.values(DataSnapshot.val());
        messageValues.forEach((data) => {
          if (data.timestamp > lastVisitTime) {
            count += 1;
          }
        });
      }
      setChatCount(count);
    });
  };

  useEffect(() => {
    if (userId === chatRoom.createdBy.id) {
      setIsCreatedByUser(true);
      if (chatRoom.createdBy.profileImg !== undefined) {
        setProfileImg(chatRoom.createdWith.profileImg);
      }
    } else {
      setIsCreatedByUser(false);
      if (chatRoom.createdWith.profileImg !== undefined) {
        setProfileImg(chatRoom.createdBy.profileImg);
      }
    }
    getLastMessage();
    getChatNotification(chatRoom.id);
  });

  return (
    <>
      <ChattingRowBox onClick={() => clickChatRow()}>
        <UserBox>
          <Image
            shape="circle"
            src={profileImg}
            margin="0 10px 0 0"
            size="55px"
          />
          <InfoBox {...styleProps}>
            <Text medium>
              {isCreatedByUser
                ? chatRoom.createdWith.nickName
                : chatRoom.createdBy.nickName}
            </Text>
            <Text color={gray} size="15px">
              {timeFromNow(lastSentAt) === "Invalid date"
                ? ""
                : timeFromNow(lastSentAt)}
            </Text>
            <Text is_long color={gray} size="15px">
              {lastMessage}
            </Text>
            {chatCount !== 0 ? <Badge>{chatCount}</Badge> : ""}
          </InfoBox>
        </UserBox>
        <Image
          shape="rectangle"
          src={chatRoom.item.image}
          size="55px"
          borderRadius="5px"
        />
      </ChattingRowBox>
      <Line />
    </>
  );
};

const ChattingRowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  cursor: pointer;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  ${(props) => (props.isMobile ? "width: 200px;" : "width: 250px;")};
  display: grid;
  ${(props) =>
    props.isMobile
      ? "grid-template-columns: 140px 80px;"
      : "grid-template-columns: 175px 80px;"};
  gap: 10px;
`;

const Badge = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${green};
  color: ${white};
  font-size: 14px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 23px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
`;

export default ChattingRow;
