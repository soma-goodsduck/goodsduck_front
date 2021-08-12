import React, { useState, useEffect } from "react";

import styled from "styled-components";
import styles from "./pricePropose.module.css";

import ItemRow from "../../components/itemRow/itemRow";
import { Input, Flex, LoginPopUp } from "../../elements";

import { requestPublicData, postAction } from "../../shared/axios";

const PriceProposeModal = ({ _onClick }) => {
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
    const getItemDetail = requestPublicData(`v1/items/${itemId}/summary`);
    getItemDetail.then((result) => {
      setItemData(result);
    });
  }, []);

  // 가격 제안 요청
  const [price, setPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleClcik = () => {
    const postPrice = postAction(`v1/items/${itemId}/price-propose`, {
      price,
    });
    postPrice.then((result) => {
      if (result === "login") {
        setShowPopup(true);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <Screen {...styleProps}>
          <PriceProposeBox>
            <Info>
              <ExitBtn onClick={_onClick} />
              {itemData && <ItemRow item={itemData} />}
              <Flex is_felxm margin="25px 0 0 0">
                <div className={styles.wonSign}>₩</div>
                <Input
                  type="number"
                  borderRadius="5px"
                  value={price}
                  placeholder="금액을 적어주세요"
                  _onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Flex>
            </Info>
            <ProposeBtn
              onClick={() => {
                handleClcik();
              }}
            >
              가격 제시하기
            </ProposeBtn>
          </PriceProposeBox>
        </Screen>
      )}
    </>
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

const PriceProposeBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 30%;
`;

const Info = styled.div`
  position: relative;
  height: 260px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const ProposeBtn = styled.button`
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: transform 200ms ease-in;

  &:hover {
    transform: scale(1.05);
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

export default PriceProposeModal;