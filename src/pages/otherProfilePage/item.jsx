import React, { useEffect, useState } from "react";

import styled from "styled-components";
import styles from "../../components/item/item.module.css";

import { Image, Flex, Text } from "../../elements";

import { history } from "../../redux/configureStore";

import { numberWithCommas } from "../../shared/functions";

const Item = ({ item }) => {
  let color;
  let tradeType;

  if (item.tradeStatus === "SELLING") {
    color = "#e15b5b";
    tradeType = "판매";
  } else if (item.tradeStatus === "BUYING") {
    color = "#299bff";
    tradeType = "구매";
  } else if (item.tradeStatus === "RESERVING") {
    color = "#222222";
    tradeType = "예약";
  } else if (item.tradeStatus === "COMPLETE") {
    color = "#222222";
    tradeType = "완료";
  }

  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const clickItem = (e) => {
    if (e.target.tagName !== "DIV") {
      return;
    }
    history.push(`/item/${item.itemId}`);
  };

  return (
    <ItemBox onClick={(e) => clickItem(e)}>
      <Flex className={styles.imgBox}>
        <Image
          shape="rectangle"
          src={item.imageUrl}
          size={isMobile ? "28vw" : "115px"}
          borderRadius="10px"
          className={styles.itemImg}
        />
      </Flex>
      <InfoBox>
        <Flex justify="space-between" padding="5px">
          <Text
            size={isMobile ? "4vw" : "15px"}
            bold
            margin="0 2px 0 0"
            color={color}
          >
            {tradeType}
          </Text>
          <Title>
            <Text size={isMobile ? "4vw" : "14px"} is_long>
              {item.name}
            </Text>
          </Title>
        </Flex>
        <Flex justify="flex-start" padding="3px 6px">
          <Text size={isMobile ? "5vw" : "16px"} bold is_long>
            {numberWithCommas(item.price)}원
          </Text>
        </Flex>
      </InfoBox>
    </ItemBox>
  );
};

const ItemBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 68%;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 5px;
`;

export default Item;
