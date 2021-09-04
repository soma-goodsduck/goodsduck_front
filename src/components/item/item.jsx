import React, { useState } from "react";

import styled from "styled-components";
import styles from "./item.module.css";

import { Flex } from "../../elements";

import { history } from "../../redux/configureStore";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { postAction, deleteAction } from "../../shared/axios";

const Item = ({ item, id }) => {
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
    history.push(`/item/${id}`);
  };

  const [isLike, setIsLike] = useState(item.isLike);
  const clickHeart = () => {
    if (!isLike) {
      postAction(`v1/items/${id}/like`);
    } else {
      deleteAction(`v1/items/${id}/like`);
    }

    setIsLike(!isLike);
  };

  return (
    <ItemBox onClick={(e) => clickItem(e)}>
      <Flex className={styles.imgBox}>
        <ItemImg src={item.imageUrl} className={styles.itemImg} />
        <div className={styles.likeBox}>
          <button
            type="button"
            aria-label="like"
            className={isLike ? styles.clickLikeBtn : styles.likeBtn}
            onClick={() => clickHeart()}
          />
        </div>
      </Flex>
      <InfoBox>
        <Flex justify="flex-start" padding="5px 0">
          <Text bold margin="0 5px 0 0" color={color}>
            {tradeType}
          </Text>
          <Title>
            <Text isLong>{item.name}</Text>
          </Title>
        </Flex>
        <Flex justify="flex-start" padding="5px 0">
          <Text priceSize bold isLong>
            {numberWithCommas(item.price)}원
          </Text>
        </Flex>
        <Flex justify="space-between" padding="5px 0 20px 0">
          <Flex>
            <UserImg
              src={
                item.itemOwner.imageUrl ||
                "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
              }
            />
            <UserName>
              <Text isLong nickSize>
                {item.itemOwner.nickName}
              </Text>
            </UserName>
          </Flex>
          <Text color="#bbbbbb" timeSize>
            {timeForToday(item.itemCreatedAt)}
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
  width: 30vw;
  @media screen and (min-width: 415px) {
    width: 140px;
  }
`;

const UserName = styled.div`
  width: 65px;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 5px;
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-size: 15px;
  font-size: ${(props) => props.priceSize && "16px"};
  font-size: ${(props) => props.nickSize && "15px"};
  font-size: ${(props) => props.timeSize && "13px"};
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
    font-size: ${(props) => props.priceSize && "18px"};
    font-size: ${(props) => props.nickSize && "17px"};
    font-size: ${(props) => props.timeSize && "16px"};
  }
`;

const ItemImg = styled.div`
  width: 45vw;
  height: 45vw;
  border-radius: 10px;

  background-image: url("${(props) => props.src}");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 185px;
    height: 185px;
  }
`;

const UserImg = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 22px;
  margin: 0 5px 0 0;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;

  @media screen and (min-width: 415px) {
    width: 24px;
    height: 24px;
  }
`;

export default Item;
