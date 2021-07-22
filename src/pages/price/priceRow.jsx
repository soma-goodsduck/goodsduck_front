import React from "react";
import styled from "styled-components";
import styles from "./pricePropose.module.css";

import { Flex, Image, Text } from "../../elements";
import { timeForToday, numberWithCommas } from "../../shared/functions";

import { getData } from "../../shared/axios";

const PriceRow = ({ item }) => {
  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 가격제안 수락, 거절
  const proposeId = item.priceProposeId;
  const handleAccept = () => {
    const getItemDetail = getData(`item/${itemId}/propose/${proposeId}/accept`);
    getItemDetail.then((result) => {
      if (result.success === true) {
        console.log("가격 제안을 수락했습니다");
      } else {
        console.log("가격 제안 수락에 실패했습니다");
      }
    });
  };
  const handleReject = () => {
    const getItemDetail = getData(`item/${itemId}/propose/${proposeId}/refuse`);
    getItemDetail.then((result) => {
      if (result.success === true) {
        console.log("가격 제안을 거절했습니다");
      } else {
        console.log("가격 제안 거절에 실패했습니다");
      }
    });
  };

  return (
    <Flex justify="space-between" padding="20px 0">
      <Flex is_flex>
        <Image
          shape="circle"
          src="https://i.pinimg.com/originals/a8/7b/5d/a87b5da556f38ab9c7f7e143fbcb8201.jpg"
          // src={item.proposer.imageUrl}
          margin="0 10px 0 0"
          size="60px"
        />
        <Flex is_col align="flex-start">
          <Flex>
            <Image shape="circle" size="15px" margin="0 5px 0 0" />
            <Text is_long>{item.proposer.nickName}</Text>
          </Flex>
          <Text size="20px" bold margin="5px 0">
            {numberWithCommas(item.proposedPrice)}원
          </Text>
          <Text size="16px" color="#bbbbbb">
            {timeForToday(item.createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Flex is_flex>
        <button
          type="button"
          className={styles.acceptBtn}
          onClick={() => {
            handleAccept();
          }}
        >
          수락
        </button>
        <button
          type="button"
          className={styles.rejectBtn}
          onClick={() => {
            handleReject();
          }}
        >
          거절
        </button>
      </Flex>
    </Flex>
  );
};

export default PriceRow;
