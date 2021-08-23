import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Flex, Image, Notification } from "../../elements";
import { gray, grayBorder, white } from "../../shared/colors";

import { timeForToday } from "../../shared/functions";
import { requestAuthData } from "../../shared/axios";

import { history } from "../../redux/configureStore";

const NotificationRow = ({ notification }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const styleProps = {
    isRead,
  };

  useEffect(() => {
    if (notification.isRead) {
      setIsRead(true);
    }
  }, []);

  const handleClick = () => {
    if (notification.type === "PRICE_PROPOSE") {
      const isValidPropose = requestAuthData(
        `v1/items/${notification.itemId}/price-propose/${notification.priceProposeId}`,
      );

      isValidPropose.then((result) => {
        if (result) {
          history.push(notification.message.messageUri);
        } else {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 2000);
        }
      });
    } else {
      history.push(notification.message.messageUri);
    }
  };

  return (
    <>
      {showPopup && <Notification data="취소된 가격 제시입니다." />}
      {notification.type !== "CHAT" && notification.type !== "USER_ITEM" && (
        <div>
          <NotificationRowBox {...styleProps}>
            <UserBox>
              <Image
                shape="circle"
                src={
                  notification.senderImageUrl ||
                  "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
                }
                margin="0 10px 0 0"
                size="60px"
              />
              <InfoBox onClick={() => handleClick()}>
                <Flex>
                  <TextBox {...styleProps}>
                    {notification.message.messageBody}
                  </TextBox>
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
  padding: 20px 16px;
  cursor: pointer;
  background-color: ${(props) => (props.isRead ? white : grayBorder)};
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: 415px) {
    width: 300px;
  }
`;

const TextBox = styled.span`
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;

  background-color: ${(props) => (props.isRead ? white : grayBorder)};
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
