import React, { useState, useRef } from "react";
import styled from "styled-components";
import styles from "./idolGroupFiltering.module.css";
import { Flex, Text, Image } from "../../elements";
import Idol from "./idolFiltering";
import { idols } from "../../shared/JsonData";

const IdolGroupFiltering = () => {
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
    <div
      aria-hidden
      className={styles.categories}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
    >
      <Flex justify="flex-start">
        {idols.map((idol) => (
          <Idol key={idol.engName} idol={idol} className={styles.category} />
        ))}
        <BtnBox>
          <AddBtn>
            <Image
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg"
              size="40px"
            />
          </AddBtn>
          <Text size="13px" margin="10px 0 0 0" color="#222222">
            그룹 추가
          </Text>
        </BtnBox>
      </Flex>
    </div>
  );
};

const BtnBox = styled.button`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f8f8f8;
`;

export default IdolGroupFiltering;
