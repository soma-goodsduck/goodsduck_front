import React, { useEffect, useState } from "react";

import styled from "styled-components";
import styles from "./item.module.css";

import { Image, Grid, Flex, Text } from "../../elements";

import { history } from "../../redux/configureStore";

import { timeForToday, numberWithCommas } from "../../shared/functions";

const Item = ({ item, id }) => {
  const [isLike, setIsLike] = useState(false);

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
    history.push(`/item/${id}`);
  };

  const clickHeart = () => {
    setIsLike(!isLike);
  };

  return (
    <Grid is_flex_col margin="10px 0 0 0" _onClick={(e) => clickItem(e)}>
      <Flex className={styles.imgBox}>
        <Image
          shape="rectangle"
          src={item.image_url}
          size={isMobile ? "43vw" : "185px"}
          borderRadius="10px"
          className={styles.itemImg}
        />
        <button
          type="button"
          aria-label="like"
          className={isLike ? styles.clickLikeBtn : styles.likeBtn}
          onClick={() => clickHeart()}
        />
      </Flex>
      <InfoBox>
        <Flex justify="flex-start" padding="5px">
          <Text
            size={isMobile ? "4vw" : "16px"}
            bold
            margin="0 5px 0 0"
            color={item.trade_type === "구매" ? "#299bff" : "#e15b5b"}
          >
            {item.trade_type}
          </Text>
          <Title>
            <Text size={isMobile ? "4vw" : "16px"} is_long>
              {item.name}
            </Text>
          </Title>
        </Flex>
        <Flex justify="flex-start" padding=" 0 7px">
          <Text size={isMobile ? "5vw" : "18px"} bold>
            {numberWithCommas(item.price)}원
          </Text>
        </Flex>
        <Flex justify="space-between" padding="5px 10px 20px 5px">
          <Flex>
            <Image
              shape="circle"
              src={item.user_info.user_profile}
              size={isMobile ? "6.5vw" : "24px"}
              margin="0 7px 0 0"
            />
            <UserName>
              <Text is_long size={isMobile ? "4.5vw" : "17px"}>
                {item.user_info.user_name}
              </Text>
            </UserName>
          </Flex>
          <Text color="#bbbbbb" size={isMobile ? "4vw" : "16px"}>
            {timeForToday(item.item_created_at)}
          </Text>
        </Flex>
      </InfoBox>
    </Grid>
  );
};

const Title = styled.div`
  width: 75%;
`;

const UserName = styled.div`
  width: 65px;
`;

const InfoBox = styled.div`
  padding: 5px;
`;

export default Item;
