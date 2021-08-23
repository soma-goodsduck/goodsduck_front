import React from "react";

import styled from "styled-components";
import styles from "../../components/item/item.module.css";

import { Flex } from "../../elements";

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

  const clickItem = (e) => {
    if (e.target.tagName !== "DIV") {
      return;
    }
    history.push(`/item/${item.itemId}`);
  };

  return (
    <ItemBox onClick={(e) => clickItem(e)}>
      <Flex className={styles.imgBox}>
        <ItemImg src={item.imageUrl} className={styles.itemImg} />
      </Flex>
      <InfoBox>
        <Flex justify="space-between" padding="5px">
          <Text typeSize bold margin="0 2px 0 0" color={color}>
            {tradeType}
          </Text>
          <Title>
            <Text namesize isLong>
              {item.name}
            </Text>
          </Title>
        </Flex>
        <Flex justify="flex-start" padding="3px 6px">
          <Text prciesize bold isLong>
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

const ItemImg = styled.div`
  width: 28vw;
  height: 28vw;
  border-radius: 10px;

  background-image: url("${(props) => props.src}");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 115px;
    height: 115px;
  }
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-size: 4vw;
  font-size: ${(props) => props.typeSize && "4vw"};
  font-size: ${(props) => props.namesize && "4vw"};
  font-size: ${(props) => props.prciesize && "5vw"};
  font-weight: ${(props) => (props.bold ? "600" : "")};
  font-weight: ${(props) => (props.medium ? "500" : "")};
  margin: ${(props) => props.margin};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.isLong
      ? "white-space: nowrap; overflow:hidden; text-overflow: ellipsis; "
      : ""}

  @media screen and (min-width: 415px) {
    font-size: 16px;
    font-size: ${(props) => props.typeSize && "15px"};
    font-size: ${(props) => props.namesize && "14px"};
    font-size: ${(props) => props.prciesize && "16px"};
  }
`;

export default Item;
