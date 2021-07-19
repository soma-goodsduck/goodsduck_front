import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { blackBtn, orange, darkRed, grayText } from "../../shared/colors";

import { Image, Text } from "../../elements";

import { timeForToday, numberWithCommas } from "../../shared/functions";

const ItemInfo = ({ item }) => {
  let color;
  let tradeStatus;
  if (item.tradeStatus === "TRADING") {
    color = orange;
    tradeStatus = "거래중";
  } else if (item.tradeStatus === "COMPLETE") {
    color = blackBtn;
    tradeStatus = "거래완료";
  } else if (item.tradeStatus === "SELLING") {
    color = darkRed;
    tradeStatus = "판매중";
  } else if (item.tradeStatus === "BUYING") {
    color = darkRed;
    tradeStatus = "구매중";
  }

  return (
    <ItemBox>
      <Image
        shape="rectangle"
        src={item.image[0].url}
        size="100px"
        borderRadius="5px"
      />
      <HeartIconBox>
        {item.isLike ? <HeartClickIcon /> : <HeartIcon />}
      </HeartIconBox>
      <ItemInfoBox>
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
      </ItemInfoBox>
    </ItemBox>
  );
};

const ItemBox = styled.div`
  margin: 20px 0;
  display: flex;
  position: relative;
`;

const ItemInfoBox = styled.div`
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

const HeartIcon = styled.div`
  z-index: 3;
  width: 22px;
  height: 22px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart.svg");
  background-size: cover;
`;

const HeartClickIcon = styled.div`
  z-index: 3;
  width: 22px;
  height: 22px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart_click.svg");
  background-size: cover;
`;

const HeartIconBox = styled.div`
  position: absolute;
  z-index: 2;
  color: whitesmoke;
  font-size: 20px;
  text-align: right;
  width: 100%;
  padding-top: 4px;
  padding-right: 4px;
  margin-left: 75px;
`;

export default ItemInfo;
