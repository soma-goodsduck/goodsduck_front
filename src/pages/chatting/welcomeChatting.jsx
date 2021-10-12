import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Text, Image } from "../../elements";
import { gray, grayBorder } from "../../shared/colors";

import { firebaseDatabase } from "../../shared/firebase";

import { history } from "../../redux/configureStore";

const WelcomeChatting = () => {
  const [lastMessage, setLastMessage] = useState("");
  const lastMessageRef = firebaseDatabase.ref("welcomeMessage").limitToFirst(1);

  const getLastMessage = () => {
    lastMessageRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const messageObj = data[Object.keys(data)[0]];
        if ("content" in messageObj) {
          setLastMessage(messageObj.content);
        } else if ("image" in messageObj) {
          setLastMessage("사진을 보냈습니다.");
        }
      }
    });
  };

  useEffect(() => {
    getLastMessage();

    return () => {
      lastMessageRef.off();
    };
  });

  return (
    <>
      <ChattingRowBox onClick={() => history.push("/chat-room/welcome")}>
        <UserBox>
          <Image
            shape="circle"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
            margin="0 10px 0 0"
            size="55px"
          />
          <InfoBox>
            <Text medium>GOODSDUCK </Text>
            <Text is_long color={gray} size="15px" margin="10px 0 0 0">
              {lastMessage}
            </Text>
          </InfoBox>
        </UserBox>
      </ChattingRowBox>
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
  display: flex;
  flex-direction: column;
`;

export default WelcomeChatting;
