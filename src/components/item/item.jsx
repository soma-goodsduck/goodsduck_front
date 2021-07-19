import React, { useEffect, useState } from "react";

import styled from "styled-components";
import styles from "./item.module.css";

import { Image, Flex, Text } from "../../elements";

import { history } from "../../redux/configureStore";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { getAction, deleteAction } from "../../shared/axios";

const Item = ({ item, id }) => {
  let color;
  let tradeType;
  if (item.tradeType === "SELL") {
    color = "#e15b5b";
    tradeType = "판매";
  } else if (item.tradeType === "BUY") {
    color = "#299bff";
    tradeType = "구매";
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
    history.push(`item/${id}`);
  };

  const [isLike, setIsLike] = useState(item.like);
  // 좋아요
  const clickHeart = () => {
    if (!isLike) {
      getAction(`like/item/${id}`);
    } else {
      deleteAction(`like/item/${id}`);
    }

    setIsLike(!isLike);
  };

  return (
    <ItemBox onClick={(e) => clickItem(e)}>
      <Flex className={styles.imgBox}>
        <Image
          shape="rectangle"
          src={item.images[0].url}
          size={isMobile ? "43vw" : "185px"}
          borderRadius="10px"
          className={styles.itemImg}
        />
        <div className={styles.likeBox}>
          <button
            type="button"
            aria-label="like"
            className={item.like ? styles.clickLikeBtn : styles.likeBtn}
            onClick={() => clickHeart()}
          />
        </div>
      </Flex>
      <InfoBox>
        <Flex justify="flex-start" padding="5px">
          <Text
            size={isMobile ? "4vw" : "16px"}
            bold
            margin="0 5px 0 0"
            color={color}
          >
            {tradeType}
          </Text>
          <Title>
            <Text size={isMobile ? "4vw" : "16px"} is_long>
              {item.name}
            </Text>
          </Title>
        </Flex>
        <Flex justify="flex-start" padding="5px 7px">
          <Text size={isMobile ? "5vw" : "18px"} bold>
            {numberWithCommas(item.price)}원
          </Text>
        </Flex>
        <Flex justify="space-between" padding="5px 5px 20px 3px">
          <Flex>
            <Image
              shape="circle"
              // src={item.user_info.user_profile}
              size={isMobile ? "6.5vw" : "24px"}
              margin="0 5px 0 0"
            />
            <UserName>
              <Text is_long size={isMobile ? "4.3vw" : "17px"}>
                {item.user.nickName}
              </Text>
            </UserName>
          </Flex>
          <Text color="#bbbbbb" size={isMobile ? "3.5vw" : "16px"}>
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
`;

const Title = styled.div`
  width: 75%;
`;

const UserName = styled.div`
  width: 65px;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 5px;
`;

export default Item;
