import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./itemDetail.module.css";

import PricePropose from "../price/pricePropose";
import PriceProposeDelete from "../price/priceProposeDelete";
import { Flex, Text, Icon } from "../../elements/index";

import { history } from "../../redux/configureStore";

import { numberWithCommas } from "../../shared/functions";

const ItemNav = ({ item, id, isWriter }) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  console.log(item);

  const [showPricePopup, setShowPricePopup] = useState(null);
  const hidePricePopup = () => {
    setShowPricePopup(false);
  };
  const [showPriceDeletePopup, setShowPriceDeletePopup] = useState(null);
  const hidePriceDeletePopup = () => {
    setShowPriceDeletePopup(false);
  };

  const [isPriceProposer, setIsPriceProposer] = useState(false);
  //   useEffect(()=> {
  //     if(item.pricePropose !== null) {
  //         setIsPriceProposer(true)
  //     }
  //   }, [])

  const [isHighPrice, setIsHighPrice] = useState(false);
  useEffect(() => {
    if (item.price > 999999) {
      setIsHighPrice(true);
    }
  }, []);

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
          // priceId={item.pricePropose.priceProposeId}
          // proposePrice={item.pricePropose.proposePrice}
          _onClick={() => {
            hidePriceDeletePopup();
          }}
        />
      )}
      <ItemNavBox
        className={isHighPrice ? styles.itemNavCol : styles.itemNavRow}
      >
        <Text bold size={isMobile ? "20px" : "25px"}>
          {numberWithCommas(item.price)}원
        </Text>
        {isWriter && (
          <Button
            className={styles.btnRePrice}
            onClick={() => {
              history.push(`/price/${id}`);
            }}
          >
            가격 제안 보기
          </Button>
        )}
        {/* 가격제안 한 적 없는 경우 */}
        {!isWriter && (
          <Flex>
            <Button
              className={isHighPrice ? styles.btnChatCol : styles.btnChat}
              onClick={() => {
                console.log("hi");
                setShowPriceDeletePopup(true);
              }}
            >
              <Icon
                width="18px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                alt="go chat"
                margin="0 5px 2px 0"
              />
              즉시 판매 가능
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
        {/* {!isWriter &&
            isPriceProposer(
                <Flex>
                  className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                    <Icon
                      width="18px"
                      src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                      alt="go chat"
                      margin="0 5px 2px 0"
                    />
                    즉시 판매 가능
                  </Button>
                  <Button
                    className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                    onClick={() => {
                      setShowPriceDeletePopup(true);
                    }}
                  >
                    가격 제시 수정
                  </Button>
                </Flex>,
              )} */}
      </ItemNavBox>
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
  padding: 15px;
  cursor: pointer;
`;

export default ItemNav;
