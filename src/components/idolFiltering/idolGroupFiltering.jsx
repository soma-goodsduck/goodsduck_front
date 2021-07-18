import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./idolGroupFiltering.module.css";
import { Flex, Text, Image } from "../../elements";

import idols from "../../shared/IdolGroupData.json";

import { actionCreators as headerActions } from "../../redux/modules/header";

const IdolGroupFiltering = () => {
  const dispatch = useDispatch();

  const [groupId, setGroupId] = useState(0);
  const isFiltering = useSelector((state) => state.header.click_filtering);

  const checkGroupHandler = (id) => {
    setGroupId(id);
    dispatch(headerActions.clickfilteringAction(isFiltering));
  };

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
          <IdolBox key={idol.id}>
            <IdolInput
              id={idol.id}
              type="radio"
              checked={groupId === idol.id}
              onChange={() => checkGroupHandler(idol.id)}
            />
            <label
              htmlFor={idol.id}
              className={
                groupId === idol.id
                  ? styles.clickIdolGroupBtn
                  : styles.idolGroupBtn
              }
            >
              <img
                className={
                  groupId === idol.id
                    ? styles.clickIdolGroupImg
                    : styles.idolGroupImg
                }
                src={idol.imageUrl}
                alt="Idol Group"
              />
              {idol.name}
            </label>
          </IdolBox>
        ))}
        <BtnBox>
          <AddBtn>
            <Image
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg"
              size="30px"
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

const IdolBox = styled.div`
  padding: 0 10px;
  text-align: center;
`;
const IdolInput = styled.input`
  display: none;
`;

const BtnBox = styled.button`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
`;

export default IdolGroupFiltering;
