import React from "react";
import styled from "styled-components";

import { Flex, ItemStatusBox, Text } from "../../elements";
import {
  grayBtnBorder,
  yellow,
  blackBtn,
  orange,
  darkRed,
  grayText,
} from "../../shared/colors";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { patchJsonAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ItemRow = ({ item }) => {
  let color;
  let updateStatusKR; // 변경할 상태 (한국어)
  let updateStatus; // 변경할 상태 (영어)
  let tradeStatus; // 현재 상태

  if (item.tradeStatus === "RESERVING" && item.tradeType === "구매") {
    // 구매 상품 중 예약된 경우
    color = orange;
    tradeStatus = "예약중";
    updateStatusKR = "구매중";
    updateStatus = "BUYING";
  } else if (item.tradeStatus === "RESERVING" && item.tradeType === "판매") {
    // 판매 상품 중 예약된 경우
    color = orange;
    tradeStatus = "예약중";
    updateStatusKR = "판매중";
    updateStatus = "SELLING";
  } else if (item.tradeStatus === "COMPLETE") {
    // 거래완료된 상품
    tradeStatus = "거래완료";
    color = blackBtn;
  } else if (item.tradeStatus === "SELLING") {
    // 판매 상품
    color = darkRed;
    tradeStatus = "판매중";
    updateStatusKR = "예약중";
    updateStatus = "RESERVING";
  } else if (item.tradeStatus === "BUYING") {
    // 구매 상품
    color = darkRed;
    tradeStatus = "구매중";
    updateStatusKR = "예약중";
    updateStatus = "RESERVING";
  }

  const handleUpdate = (_updateStatus) => {
    patchJsonAction(`v1/items/${item.itemId}/trade-status`, {
      tradeStatus: _updateStatus,
    });
    window.location.reload();
  };

  return (
    <>
      {/* 상품 정보 */}
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
      {/* 상태 변경 버튼 */}
      {item.tradeStatus !== "COMPLETE" && (
        <Flex justify="space-between">
          <StatusBtn
            onClick={() => {
              handleUpdate(updateStatus);
            }}
          >
            {updateStatusKR}으로 변경
          </StatusBtn>
          <StatusBtn
            onClick={() => {
              history.push(`/review/${item.itemId}`);
            }}
          >
            거래완료로 변경
          </StatusBtn>
        </Flex>
      )}
    </>
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

export default ItemRow;
