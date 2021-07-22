import React, { useState, useEffect } from "react";

import styled from "styled-components";
import styles from "./pricePropose.module.css";

import ItemRow from "../../components/itemRow/itemRow";
import { Input, Flex, Text } from "../../elements";
import { numberWithCommas } from "../../shared/functions";

import { getInfo, deleteAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const priceProposeUpdate = ({ id, proposePrice, _onClick }) => {
  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 해당 아이템 데이터 받아오기
  const [itemData, setItemData] = useState(null);
  useEffect(() => {
    const getItemDetail = getInfo(`item/${itemId}`);
    getItemDetail.then((result) => {
      setItemData(result);
    });
  }, []);

  // 가격 제안 취소
  const handleDelete = () => {
    // const deletePrice = deleteAction(`item/${itemId}/propose/${priceId}`);
    // deletePrice.then((result) => {
    //   console.log(result);
    // if (result !== null) {
    //   console.log("가격 제안 삭제에 성공했습니다");
    //   history.push(`/item/${itemId}`);
    // } else {
    //   console.log("가격 제안 삭제에 실패했습니다");
    // }
    // });
  };

  return (
    <Screen {...styleProps}>
      <PriceProposeUpdateBox>
        <Info>
          <ExitBtn onClick={_onClick} />
          {itemData && <ItemRow item={itemData} />}
          <Text size="20px" margin="20px 0 0 0" bold is_center>
            기존 제시 금액 : 15,000원
            {/* 기존 제시 금액 : {numberWithCommas(proposePrice)}원 */}
          </Text>
        </Info>

        <ProposeDeleteBtn
          onClick={() => {
            handleDelete();
          }}
        >
          취소하기
        </ProposeDeleteBtn>
      </PriceProposeUpdateBox>
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 3;
  ${(props) => (props.isMobile ? "width: 100%" : "width: 415px")};
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;
`;

const PriceProposeUpdateBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 30%;
`;

const Info = styled.div`
  position: relative;
  height: 240px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const ProposeDeleteBtn = styled.button`
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;

  &:hover {
    color: #e33e3e;
  }
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_delete.svg");
  background-size: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

export default priceProposeUpdate;
