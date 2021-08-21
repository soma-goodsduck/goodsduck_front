import React from "react";
import styled from "styled-components";

import { Image, Text } from "../../elements";
import {
  grayBtnBorder,
  yellow,
  blackBtn,
  orange,
  darkRed,
  grayText,
} from "../../shared/colors";

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
      <Image
        shape="rectangle"
        src={item.imageUrl}
        size="100px"
        borderRadius="5px"
      />
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

const StatusBtn = styled.button`
  width: 48%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${grayBtnBorder};
  font-weight: bold;
  font-size: 14px;
  box-sizing: border-box;

  &:hover {
    padding: 13px;
    background-color: ${yellow};
    border: none;
  }
`;

export default OtherItemRow;
