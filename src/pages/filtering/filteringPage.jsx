/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "../itemUpload/itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";
import { Flex, Text } from "../../elements";
import { history } from "../../redux/configureStore";
import { actionCreators as headerActions } from "../../redux/modules/header";
import { grayText, grayBorder } from "../../shared/colors";

const Filtering = (props) => {
  const dispatch = useDispatch();

  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  const idolMember = localStorage.getItem("filter_idolMember");
  const idolMemberName = localStorage.getItem("filter_idolMemberName");
  const itemCategory = localStorage.getItem("filter_category");
  const itemStatus = localStorage.getItem("filter_status");
  const { itemTradeType, itemPriceMin, itemPriceMax } = useSelector(
    (state) => ({
      itemTradeType: state.header.filterTradeType,
      itemPriceMin: state.header.filterPriceMin,
      itemPriceMax: state.header.filterPriceMax,
    }),
  );
  const priceMinRef = useRef();
  const priceMaxRef = useRef();

  const clickTradeType = (e) => {
    if (e.target.innerText === "전체") {
      dispatch(headerActions.setFilterTradeType("all"));
    } else if (e.target.innerText === "구매") {
      dispatch(headerActions.setFilterTradeType("buy"));
    } else if (e.target.innerText === "판매") {
      dispatch(headerActions.setFilterTradeType("sell"));
    }
  };

  return (
    <>
      <HeaderInfo text="필터" isClear />
      <Flex is_col margin="70px 0 0 0">
        <div
          className={styles.selectBtn}
          onClick={() => {
            history.replace("/filter-select-idol-member");
          }}
        >
          <div
            className={
              idolMember !== null ? styles.selectDoneText : styles.selectText
            }
          >
            {idolMember !== null ? `${idolMemberName}` : "아이돌 멤버"}
          </div>
          <div
            className={idolMember ? styles.moreIconClick : styles.moreIcon}
          />
        </div>
        <TypeBtns {...styleProps}>
          <Text color={grayText} margin="20px 12px">
            상품 구분
          </Text>
          <Flex is_flex justify="space-between" margin="0 10px">
            <TypeBtn
              {...styleProps}
              className={
                itemTradeType === "all" ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickTradeType(e)}
            >
              전체
            </TypeBtn>
            <TypeBtn
              {...styleProps}
              className={
                itemTradeType === "sell" ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickTradeType(e)}
            >
              판매
            </TypeBtn>
            <TypeBtn
              {...styleProps}
              className={
                itemTradeType === "buy" ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickTradeType(e)}
            >
              구매
            </TypeBtn>
          </Flex>
          <Line />
        </TypeBtns>
        <div
          className={styles.selectBtn}
          onClick={() => {
            history.replace("/filter-category");
          }}
        >
          <div
            className={
              itemCategory !== null ? styles.selectDoneText : styles.selectText
            }
          >
            {itemCategory !== null ? `${itemCategory}` : "카테고리"}
          </div>
          <div
            className={itemCategory ? styles.moreIconClick : styles.moreIcon}
          />
        </div>
        <div
          className={styles.selectBtn}
          onClick={() => {
            history.replace("/filter-status");
          }}
        >
          <div
            className={
              itemStatus !== null ? styles.selectDoneText : styles.selectText
            }
          >
            {itemStatus !== null ? `${itemStatus}급` : "굿즈 상태"}
          </div>
          <div
            className={itemStatus ? styles.moreIconClick : styles.moreIcon}
          />
        </div>
        <PriceInputs {...styleProps}>
          <Text color={grayText} margin="20px 12px">
            가격대
          </Text>
          <Flex is_flex justify="space-between" margin="0 10px">
            <PriceInput
              className={itemPriceMin ? "" : styles.priceInput}
              ref={priceMinRef}
              value={itemPriceMin || ""}
              type="number"
              placeholder="최저 가격"
              onChange={() => {
                dispatch(
                  headerActions.setFilterPriceMin(priceMinRef.current.value),
                );
              }}
            />
            <Text color={grayText} margin="0px 20px">
              -
            </Text>
            <PriceInput
              className={itemPriceMax ? "" : styles.priceInput}
              ref={priceMaxRef}
              value={itemPriceMax || ""}
              type="number"
              placeholder="최고 가격"
              onChange={() => {
                dispatch(
                  headerActions.setFilterPriceMax(priceMaxRef.current.value),
                );
              }}
            />
          </Flex>
          <Line />
        </PriceInputs>
      </Flex>
    </>
  );
};

const TypeBtns = styled.div`
  ${(props) => (props.isMobile ? "width: 340px;" : "width: 380px;")};
`;

const TypeBtn = styled.button`
  ${(props) => (props.isMobile ? "width: 30vw;" : "width: 110px;")};
  padding: 15px;
  margin-right: 10px;
`;

const PriceInputs = styled.div`
  ${(props) => (props.isMobile ? "width: 340px;" : "width: 380px;")};
`;
const PriceInput = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid ${grayBorder};
  border-radius: 3px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
  margin-top: 20px;
`;

export default Filtering;
