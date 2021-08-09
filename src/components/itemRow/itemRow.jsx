import React from "react";

import styled from "styled-components";
import { blackBtn, orange, darkRed, grayText } from "../../shared/colors";
import { Image, Text } from "../../elements";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { history } from "../../redux/configureStore";

const ItemRow = ({ item, isNotBtn }) => {
  let color;
  let tradeStatus;
  if (item.tradeStatus === "RESERVING") {
    color = orange;
    tradeStatus = "예약중";
  } else if (item.tradeStatus === "COMPLETE") {
    color = blackBtn;
    tradeStatus = "거래완료";
  } else if (item.tradeStatus === "SELLING") {
    color = darkRed;
    tradeStatus = "판매중";
  } else if (item.tradeStatus === "BUYING") {
    color = darkRed;
    tradeStatus = "구매중";
  } else if (item.tradeStatus === "REVIEW") {
    color = blackBtn;
    tradeStatus = "REVIEW";
  }

  const styles = { isNotBtn };

  return (
    <ItemBox
      {...styles}
      onClick={() => {
        history.push(`/item/${item.id}`);
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
            {tradeStatus !== "REVIEW" && tradeStatus}
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

ItemRow.defaultProps = {
  isNotBtn: false,
};

const ItemBox = styled.div`
  margin: 20px 0;
  display: flex;
  position: relative;
  ${(props) => (props.isNotBtn ? "cursor: pointer;" : "")}
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

export default ItemRow;
