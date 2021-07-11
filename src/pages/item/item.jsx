import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./item.module.css";

import { Flex, Text, Image } from "../../elements/index";
import { item } from "../../shared/JsonDataItemDetail";

const Item = ({ history }) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  console.log(isMobile);

  const goBack = () => {
    console.log("back");
    history.goBack();
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Flex is_col className={styles.container}>
      <Flex className={styles.imgBox}>
        <Image
          shape="rectangle"
          src={item.image_url}
          size={isMobile ? `${screen}px` : "415px"}
          className={styles.itemImg}
        />
        <button
          type="button"
          aria-label="back"
          className={styles.backBtn}
          onClick={() => {
            goBack();
          }}
        />
      </Flex>
      <InfoBox>
        {/* 타입, 제목 */}
        <Flex justify="flex-start" margin="0 0 20px 0">
          <Text
            size="24px"
            bold
            margin="0 20px 0 0"
            color={item.trade_type === "구매" ? "#299bff" : "#e15b5b"}
          >
            {item.trade_type}
          </Text>
          <Title>
            <Text is_long size="24px">
              {item.name}
            </Text>
          </Title>
        </Flex>
        {/* 시간, 조회수, 좋아요 */}
        <Flex justify="flex-start">
          <Flex>
            <Text size="18px" color="#bbbbbb">
              {item.item_created_at}분전
            </Text>
          </Flex>
          <Flex margin="0 20px">
            <Text size="18px" color="#bbbbbb">
              {item.views_item_count}
            </Text>
          </Flex>
          <Flex>
            <Text size="18px" color="#bbbbbb">
              {item.likes_item_count}
            </Text>
          </Flex>
        </Flex>
        <div className={styles.line} />
        {/* 상품 설명 */}
        <Flex justify="flex-start" padding=" 0 7px">
          <Text>{item.description}</Text>
        </Flex>
        <div className={styles.line} />
        {/* 가격 제안 목록 */}
        <Text bold size="18px">
          가격 제안 목록
        </Text>
        <div className={styles.line} />
        {/* 글쓴이 정보 */}
        <Flex justify="space-between">
          <Flex>
            <Image
              shape="circle"
              src={item.user_image}
              margin="0 7px 0 0"
              size="50px"
            />
            <Flex is_col align="flex-start">
              <Image shape="circle" size="15px" margin="0 0 5px 0" />
              <UserName>
                <Text is_long>{item.user_name}</Text>
              </UserName>
            </Flex>
          </Flex>
          <Text>판매자의 다른 상품 구경하기 </Text>
        </Flex>
        <div className={styles.line} />
      </InfoBox>
      {/* 가격, 버튼 */}
      <Flex padding="0 20px" justify="space-between">
        <Text bold size="22px">
          {numberWithCommas(item.price)}원
        </Text>
        <Button className={styles.btnChat}>즉시 판매 가능</Button>
        <Button className={styles.btnPrice}>가격 제시하기</Button>
      </Flex>
    </Flex>
  );
};

const Title = styled.div`
  width: 70%;
`;

const UserName = styled.div`
  width: 65px;
`;

const InfoBox = styled.div`
  width: 415px;
  padding: 20px 20px 0 20px;
`;

const Button = styled.div`
  font-weight: bold;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
`;

export default Item;
