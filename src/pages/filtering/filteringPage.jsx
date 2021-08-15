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
import { actionCreators as filteringActions } from "../../redux/modules/filtering";
import { grayText, grayBorder, red } from "../../shared/colors";

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

  const {
    idolMember,
    idolMemberName,
    itemCategory,
    itemCategoryName,
    itemStatus,
    itemTradeType,
    itemTradeTypeKor,
    itemPriceMin,
    itemPriceMax,
  } = useSelector((state) => ({
    idolMember: state.filtering.filterIdolMemberId,
    idolMemberName: state.filtering.filterIdolMember,
    itemCategory: state.filtering.filterCategoryId,
    itemCategoryName: state.filtering.filterCategory,
    itemStatus: state.filtering.filterStatus,
    itemTradeType: state.filtering.filterTradeType,
    itemTradeTypeKor: state.filtering.filterTradeTypeKor,
    itemPriceMin: state.filtering.filterPriceMin,
    itemPriceMax: state.filtering.filterPriceMax,
  }));
  const priceMinRef = useRef();
  const priceMaxRef = useRef();
  const [isHigherThanMin, setIsHigherThanMin] = useState(true);

  const clickTradeType = (e) => {
    if (e.target.innerText === "전체") {
      dispatch(filteringActions.setFilterTradeType("ALL", "전체"));
    } else if (e.target.innerText === "구매") {
      dispatch(filteringActions.setFilterTradeType("BUY", "구매"));
    } else if (e.target.innerText === "판매") {
      dispatch(filteringActions.setFilterTradeType("SELL", "판매"));
    }
  };

  const filterReset = () => {
    dispatch(filteringActions.clearFiltering());
  };

  const next = () => {
    const filteringInfo = {
      idolMember,
      idolMemberName,
      tradeType: itemTradeType,
      tradeTypeKor: itemTradeTypeKor,
      category: itemCategory,
      categoryName: itemCategoryName,
      gradeStatus: itemStatus,
      minPrice: itemPriceMin,
      maxPrice: itemPriceMax,
    };
    localStorage.setItem("filtering", JSON.stringify(filteringInfo));
    history.push("/");
  };

  return (
    <>
      <HeaderInfo text="필터" isClear />
      <Flex is_col margin="70px 0 0 0">
        <div
          className={styles.selectBtn}
          onClick={() => {
            history.push("/filter-select-idol-member");
          }}
        >
          <div
            className={
              idolMemberName !== "" ? styles.selectDoneText : styles.selectText
            }
          >
            {idolMemberName !== "" ? `${idolMemberName}` : "아이돌 멤버"}
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
                itemTradeType === "ALL" ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickTradeType(e)}
            >
              전체
            </TypeBtn>
            <TypeBtn
              {...styleProps}
              className={
                itemTradeType === "SELL" ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickTradeType(e)}
            >
              판매
            </TypeBtn>
            <TypeBtn
              {...styleProps}
              className={
                itemTradeType === "BUY" ? styles.clickTypeBtn : styles.typeBtn
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
            history.push("/filter-category");
          }}
        >
          <div
            className={
              itemCategory !== "" ? styles.selectDoneText : styles.selectText
            }
          >
            {itemCategory !== "" ? `${itemCategoryName}` : "카테고리"}
          </div>
          <div
            className={itemCategory ? styles.moreIconClick : styles.moreIcon}
          />
        </div>
        <div
          className={styles.selectBtn}
          onClick={() => {
            history.push("/filter-status");
          }}
        >
          <div
            className={
              itemStatus !== "" ? styles.selectDoneText : styles.selectText
            }
          >
            {itemStatus !== "" ? `${itemStatus}급` : "굿즈 상태"}
          </div>
          <div
            className={itemStatus ? styles.moreIconClick : styles.moreIcon}
          />
        </div>
        <PriceInputs {...styleProps}>
          <Text color={grayText} margin="20px 15px">
            가격대
          </Text>
          <Flex is_flex justify="space-between" margin="0 15px">
            <PriceInput
              className={itemPriceMin ? "" : styles.priceInput}
              ref={priceMinRef}
              value={itemPriceMin || ""}
              type="number"
              placeholder="최저 가격"
              onChange={() => {
                dispatch(
                  filteringActions.setFilterPriceMin(priceMinRef.current.value),
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
                if (Number(priceMaxRef.current.value) > Number(itemPriceMin)) {
                  setIsHigherThanMin(true);
                } else {
                  setIsHigherThanMin(false);
                }
                dispatch(
                  filteringActions.setFilterPriceMax(priceMaxRef.current.value),
                );
              }}
            />
          </Flex>
          {!isHigherThanMin && (
            <Text bold color={red} is_center margin="20px 0">
              ⚠️ 최고 가격은 최저 가격보다 높아야 합니다.
            </Text>
          )}
          <Line />
        </PriceInputs>
        <button
          className={styles.filterResetBtn}
          type="button"
          onClick={() => {
            filterReset();
          }}
        >
          필터 초기화
        </button>
        <button
          className={styles.filterNextBtn}
          type="button"
          onClick={() => {
            next();
          }}
        >
          적용
        </button>
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
