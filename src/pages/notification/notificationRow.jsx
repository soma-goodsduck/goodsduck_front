import React from "react";

import styled from "styled-components";
import { Flex, Image } from "../../elements";
import { gray, grayBorder } from "../../shared/colors";

import { timeForToday } from "../../shared/functions";

import { history } from "../../redux/configureStore";

const NotificationRow = ({ notification }) => {
  const handleClick = () => {
    if (notification.type === "PRICE_PROPOSE") {
      history.push("/price-proposes");
    }
  };

  return (
    <>
      {notification.type !== "CHAT" && notification.type !== "USER_ITEM" && (
        <div>
          <NotificationRowBox>
            <UserBox>
              <Image
                shape="circle"
                src={
                  notification.senderImageUri ||
                  "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
                }
                margin="0 10px 0 0"
                size="60px"
              />
              <InfoBox onClick={() => handleClick()}>
                <Flex>
                  <TextBox>{notification.message.messageBody}</TextBox>
                </Flex>
                <TextTimeBox>
                  {timeForToday(notification.createdAt)}
                </TextTimeBox>
              </InfoBox>
            </UserBox>
          </NotificationRowBox>
          <Line />
        </div>
      )}
    </>
  );
};

const NotificationRowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  cursor: pointer;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextBox = styled.span`
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;

const TextTimeBox = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${gray};
  margin-left: auto;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
`;

export default NotificationRow;
