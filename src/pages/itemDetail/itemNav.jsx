/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import PricePropose from "../price/pricePropose";
import PriceProposeDelete from "../price/priceProposeDelete";
import { Flex, Text, Icon, LoginPopUp } from "../../elements/index";

import { history } from "../../redux/configureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { getData } from "../../shared/axios";

import { numberWithCommas } from "../../shared/functions";

const ItemNav = ({ item, id, isOwner }) => {
  const dispatch = useDispatch();

  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const [showPricePopup, setShowPricePopup] = useState(null);
  const hidePricePopup = () => {
    setShowPricePopup(false);
  };
  const [showPriceDeletePopup, setShowPriceDeletePopup] = useState(null);
  const hidePriceDeletePopup = () => {
    setShowPriceDeletePopup(false);
  };

  const [isHighPrice, setIsHighPrice] = useState(false);
  useEffect(() => {
    if (item.price > 999999) {
      setIsHighPrice(true);
    }
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const clickChatBtn = () => {
    const getUserId = getData("/users/look-up-id");
    getUserId.then((result) => {
      if (result === -1) {
        setShowPopup(true);
      } else {
        dispatch(chatActions.addChatRoomAciton(item));
      }
    });
  };

  console.log(item);

  return (
    <>
      {showPricePopup && (
        <PricePropose
          _onClick={() => {
            hidePricePopup();
          }}
        />
      )}
      {showPriceDeletePopup && (
        <PriceProposeDelete
          priceId={item.proposedList[0].priceProposeId}
          proposePrice={item.proposedList[0].proposedPrice}
          _onClick={() => {
            hidePriceDeletePopup();
          }}
        />
      )}
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <ItemNavBox
          className={isHighPrice ? styles.itemNavCol : styles.itemNavRow}
        >
          <Text bold size={isMobile ? "20px" : "25px"}>
            {numberWithCommas(item.price)}원
          </Text>
          {/* 상품 주인일 경우 */}
          {isOwner && (
            <Button
              className={isHighPrice ? styles.btnRePriceCol : styles.btnRePrice}
              onClick={() => {
                history.push(`/price/${id}`);
              }}
            >
              가격 제안 보기
            </Button>
          )}
          {/* 가격제안 한 적 없는 경우 */}
          {!isOwner && item.myPricePropose === null && (
            <Flex>
              <Button
                className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                onClick={() => {
                  clickChatBtn();
                }}
              >
                <Icon
                  width="18px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                  alt="go chat"
                  margin="0 5px 2px 0"
                />
                즉시 {item.tradeType} 가능
              </Button>
              <Button
                className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                onClick={() => {
                  setShowPricePopup(true);
                }}
              >
                가격 제시하기
              </Button>
            </Flex>
          )}
          {/* 가격제안 한 적 있는 경우 */}
          {!isOwner &&
            item.myPricePropose !== null &&
            item.myPricePropose.status === "SUGGESTED" && (
              <Flex>
                <Button
                  className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                  onClick={() => {
                    clickChatBtn();
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  즉시 {item.tradeType} 가능
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPriceDeletePopup(true);
                  }}
                >
                  가격 제시 삭제
                </Button>
              </Flex>
            )}
          {/* 가격제안이 수락된 경우 */}
          {!isOwner &&
            item.myPricePropose !== null &&
            item.myPricePropose.status === "ACCEPTED" && (
              <Flex>
                <Button
                  className={
                    isHighPrice ? styles.btnReChatCol : styles.btnReChat
                  }
                  onClick={() => {
                    console.log("채팅방으로 이동");
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  채팅방으로 이동
                </Button>
              </Flex>
            )}
        </ItemNavBox>
      )}
    </>
  );
};

const ItemNavBox = styled.div`
  width: 100%;
  padding: 0 16px 20px 16px;
`;

const Button = styled.div`
  font-weight: bold;
  border-radius: 5px;
  padding: 12px;
  cursor: pointer;
`;

export default ItemNav;
