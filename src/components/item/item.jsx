import React from "react";
import styles from "./item.module.css";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Image, Grid, Flex, Text } from "../../elements";

const Item = ({ item, id, onHeartClick }) => {
  const isLike = useSelector((state) => state.item.is_like);

  const clickHeart = () => {
    onHeartClick(id);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Grid is_flex_col margin="10px 0 0 0">
      <Flex className={styles.imgBox}>
        <Image
          shape="rectangle"
          src={item.image_url}
          size={window.screen.width > 400 ? "185px" : "43vw"}
          borderRadius="10px"
          className={styles.itemImg}
        />
        <button
          className={isLike ? styles.clickLikeBtn : styles.likeBtn}
          onClick={() => clickHeart()}
        />
      </Flex>
      <InfoBox>
        <Flex justify="flex-start" padding="5px">
          <Text
            size={window.screen.width > 400 ? "16px" : "4vw"}
            bold
            margin="0 5px 0 0"
            color={item.trade_type === "구매" ? "#299bff" : "#e15b5b"}
          >
            {item.trade_type}
          </Text>
          <Title>
            <Text size={window.screen.width > 400 ? "16px" : "4vw"} is_long>
              {item.name}
            </Text>
          </Title>
        </Flex>
        <Flex justify="flex-start" padding=" 0 7px">
          <Text size={window.screen.width > 400 ? "18px" : "5vw"} bold>
            {numberWithCommas(item.price)}원
          </Text>
        </Flex>
        <Flex justify="space-between" padding="5px 10px 20px 5px">
          <Flex>
            <Image
              shape="circle"
              src={item.user_image}
              size={window.screen.width > 400 ? "24px" : "6.5vw"}
              margin="0 7px 0 0"
            />
            <UserName>
              <Text is_long size={window.screen.width > 400 ? "18px" : "4.5vw"}>
                {item.user_name}
              </Text>
            </UserName>
          </Flex>
          <Text
            color="#bbbbbb"
            size={window.screen.width > 400 ? "16px" : "4vw"}
          >
            {item.item_created_at}분전
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
