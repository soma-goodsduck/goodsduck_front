import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import styles from "./filtering.module.css";

import { Flex } from "../../elements";
import { grayBorder, grayBtn, grayBtnText } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const Filtering = () => {
  const handleFiltering = () => {
    localStorage.removeItem("filter_idolMember");
    localStorage.removeItem("filter_idolMemberName");
    localStorage.removeItem("filter_category");
    localStorage.removeItem("filter_status");
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
        <Flex justify="flex-start">
          <FilteringBox>그룹 & 멤버</FilteringBox>
          <FilteringBox>판매/구매</FilteringBox>
          <FilteringBox>카테고리</FilteringBox>
          <FilteringBox>굿즈 상태</FilteringBox>
          <FilteringBox>가격대</FilteringBox>
        </Flex>
      </div>
      <Line />
    </>
  );
};

const FilteringBox = styled.div`
  width: 100px;
  height: 30px;
  padding: 5px 10px;
  border-radius: 100px;
  margin-right: 10px;
  background-color: ${grayBtn};
  color: ${grayBtnText};
  text-align: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
`;

export default Filtering;
