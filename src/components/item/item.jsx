import React, { useState, memo } from "react";

import styled from "styled-components";
import styles from "./item.module.css";

import { Flex, ItemStatusBox } from "../../elements";

import { history } from "../../redux/configureStore";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { postAction, deleteAction } from "../../shared/axios";

const Item = memo(({ item, id }) => {
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

  const reqClickHeart = async () => {
    const result = await postAction(`v1/items/${id}/like`);
    return result;
  };
  const reqUnclickHeart = async () => {
    const result = await deleteAction(`v1/items/${id}/like`);
    return result;
  };

  const clickHeart = async () => {
    if (!isLike) {
      const clickAction = await reqClickHeart();
      if (clickAction < 0) {
        if (clickAction === -201) {
          return;
        }
        history.push("/error");
        return;
      }
    } else {
      const clickAction = await reqUnclickHeart();
      if (clickAction < 0) {
        if (clickAction === -201) {
          return;
        }
        history.push("/error");
        return;
      }
    }

    setIsLike(!isLike);
  };

  return (
    <>
      <ItemBox onClick={(e) => clickItem(e)}>
        <Flex className={styles.imgBox}>
          <div style={{ position: "relative" }}>
            {tradeType === "예약" && <ItemStatusBox text="예약 완료" />}
            {tradeType === "완료" && <ItemStatusBox text="거래 완료" />}
            <ItemImg src={item.imageUrl} className={styles.itemImg} />
          </div>
          {(tradeType === "구매" || tradeType === "판매") && (
            <div className={styles.likeBox}>
              <button
                type="button"
                aria-label="like"
                className={isLike ? styles.clickLikeBtn : styles.likeBtn}
                onClick={() => clickHeart()}
              />
            </div>
          )}
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
                  "https://goods-duck.com/sample_goodsduck.png"
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
    </>
  );
});

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
  width: 80px;

  @media screen and (min-width: 415px) {
    width: 95px;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 5px;
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-size: 15px;
  font-size: ${(props) => props.priceSize && "16px"};
  font-size: ${(props) => props.nickSize && "14px"};
  font-size: ${(props) => props.timeSize && "12px"};
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
    font-size: ${(props) => props.nickSize && "15px"};
    font-size: ${(props) => props.timeSize && "14px"};
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
  width: 18px;
  height: 18px;
  border-radius: 22px;
  margin: 0 5px 0 0;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;

  @media screen and (min-width: 415px) {
    width: 20px;
    height: 20px;
  }
`;

export default Item;
