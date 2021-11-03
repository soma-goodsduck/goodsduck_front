import React, { useState, useRef, memo } from "react";
import styled from "styled-components";
import styles from "./filtering.module.css";

import { Flex } from "../../elements";
import { grayBorder } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const Filtering = memo(() => {
  const filteringInfo = JSON.parse(localStorage.getItem("filtering"));
  const filteringIdolGroup = localStorage.getItem("filter_idolGroupName");

  const handleFiltering = () => {
    history.push("/filtering");
  };

  // 가로 스크롤
  const scrollRef = useRef(null);

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  return (
    <>
      <Line />
      <div
        aria-hidden
        className={styles.filterings}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
        onClick={() => {
          handleFiltering();
        }}
      >
        {filteringInfo && (
          <Flex justify="flex-start">
            <div className={styles.filterIdolBox}>
              {filteringIdolGroup !== ""
                ? `${filteringIdolGroup} ${filteringInfo.idolMemberName}`
                : filteringIdolGroup}
            </div>
            <div
              className={
                filteringInfo.tradeType !== "ALL"
                  ? styles.filterCheckBox
                  : styles.filterBox
              }
            >
              {filteringInfo.tradeType !== "ALL"
                ? filteringInfo.tradeTypeKor
                : "판매/구매"}
            </div>
            <div
              className={
                filteringInfo.category
                  ? styles.filterCheckBox
                  : styles.filterBox
              }
            >
              {filteringInfo.categoryName || "카테고리"}
            </div>
            <div
              className={
                filteringInfo.gradeStatus !== ""
                  ? styles.filterCheckBox
                  : styles.filterBox
              }
            >
              {filteringInfo.gradeStatus !== ""
                ? `${filteringInfo.gradeStatus}급`
                : "굿즈 상태"}
            </div>
            <div
              className={
                filteringInfo.minPrice !== 0 && filteringInfo.maxPrice !== 0
                  ? styles.filterPriceBox
                  : styles.filterBox
              }
            >
              {filteringInfo.minPrice !== 0 && filteringInfo.maxPrice !== 0
                ? `${filteringInfo.minPrice}원 ~ ${filteringInfo.maxPrice}원`
                : "가격대"}
            </div>
          </Flex>
        )}
        {!filteringInfo && (
          <Flex justify="flex-start">
            <div className={styles.filterIdolBox}>{filteringIdolGroup}</div>
            <div className={styles.filterBox}>판매/구매</div>
            <div className={styles.filterBox}>카테고리</div>
            <div className={styles.filterBox}>굿즈 상태</div>
            <div className={styles.filterBox}>가격대</div>
          </Flex>
        )}
      </div>
      <Line />
    </>
  );
});

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
`;

export default Filtering;
