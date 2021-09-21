import React from "react";
import styled from "styled-components";

import { Text, ItemStatusBox } from "../../elements";
import { blackBtn, orange, darkRed, grayText } from "../../shared/colors";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { history } from "../../redux/configureStore";

const OtherItemRow = ({ item }) => {
  let color;
  let tradeStatus; // 현재 상태

  if (item.tradeStatus === "RESERVING" && item.tradeType === "구매") {
    // 구매 상품 중 예약된 경우
    color = orange;
    tradeStatus = "예약중";
  } else if (item.tradeStatus === "RESERVING" && item.tradeType === "판매") {
    // 판매 상품 중 예약된 경우
    color = orange;
    tradeStatus = "예약중";
  } else if (item.tradeStatus === "COMPLETE") {
    // 거래완료된 상품
    tradeStatus = "거래완료";
    color = blackBtn;
  } else if (item.tradeStatus === "SELLING") {
    // 판매 상품
    color = darkRed;
    tradeStatus = "판매중";
  } else if (item.tradeStatus === "BUYING") {
    // 구매 상품
    color = darkRed;
    tradeStatus = "구매중";
  }

  return (
    <ItemBox
      onClick={() => {
        history.push(`/item/${item.itemId}`);
      }}
    >
      <div style={{ position: "relative" }}>
        {tradeStatus === "예약중" && (
          <ItemStatusBox
            text="예약 완료"
            size="100px"
            mSize="24vw"
            fontSize="14px"
            radius="5px"
          />
        )}
        {tradeStatus === "거래완료" && (
          <ItemStatusBox
            text="거래 완료"
            size="100px"
            mSize="24vw"
            fontSize="14px"
            radius="5px"
          />
        )}
        <ItemImg src={item.imageUrl} />
      </div>
      <ItemRowBox>
        <div>
          <Text bold color={color} size="14px">
            {tradeStatus}
          </Text>
          <Text is_long margin="5px 0">
            {item.name}
          </Text>
          <Text bold size="18px">
            {numberWithCommas(item.price)}원
          </Text>
        </div>
        <TimeText>{timeForToday(item.itemCreatedAt)}</TimeText>
      </ItemRowBox>
    </ItemBox>
  );
};

const ItemBox = styled.div`
  margin: 20px 0;
  display: flex;
  position: relative;
  cursor: pointer;
`;

const ItemRowBox = styled.div`
  width: 65%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
`;

const TimeText = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${grayText};
  font-size: 14px;
`;

const ItemImg = styled.div`
  width: 24vw;
  height: 24vw;
  border-radius: 5px;

  background-image: url("${(props) => props.src}");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 100px;
    height: 100px;
  }
`;

export default OtherItemRow;
