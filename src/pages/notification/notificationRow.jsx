import React from "react";

import styled from "styled-components";
import { Flex, Image } from "../../elements";
import { gray, grayBorder, green } from "../../shared/colors";

import { timeForToday, numberWithCommas } from "../../shared/functions";

import { history } from "../../redux/configureStore";

const NotificationRow = ({ notification }) => {
  const handleClick = () => {
    // history.push(`/item/${item.item.id}`);
    console.log("판매자 이동");
  };

  return (
    <>
      <NotificationRowBox onClick={() => handleClick()}>
        <UserBox>
          <Image
            shape="circle"
            src={
              notification.user.imageUrl ||
              "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
            }
            margin="0 10px 0 0"
            size="60px"
          />
          <InfoBox>
            <Flex>
              <TextBox>
                {notification.user.nickName}님이 &quot;
                <TextLongBox>{notification.item.name}&quot; </TextLongBox>
                {notification.type === "price-propose"
                  ? "굿즈에 가격 제안을 했어요."
                  : "굿즈에 리뷰를 남겼어요."}
                {notification.type === "price-propose" && (
                  <TextPointBox>
                    [{numberWithCommas(notification.proposedPrice)}원]
                  </TextPointBox>
                )}
              </TextBox>
            </Flex>
            <TextTimeBox>{timeForToday(notification.createdAt)}</TextTimeBox>
          </InfoBox>
        </UserBox>
      </NotificationRowBox>
      <Line />
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
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextBox = styled.span`
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;

const TextLongBox = styled.span`
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextPointBox = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${green};
  margin-left: 10px;
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
