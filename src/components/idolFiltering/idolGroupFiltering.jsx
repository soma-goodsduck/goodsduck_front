import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import styles from "./idolGroupFiltering.module.css";
import { Flex, Text, Image } from "../../elements";

import { getInfo } from "../../shared/axios";
import { grayText } from "../../shared/colors";

const IdolGroupFiltering = ({ onClick }) => {
  // 아이돌 데이터 가져오기
  const [idols, setIdols] = useState([]);
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");

  useEffect(() => {
    if (likeIdolGroupsLS) {
      const likeIdolGroups = likeIdolGroupsLS.split(",").map(Number);

      const getIdolGroup = getInfo("idol-groups");
      getIdolGroup.then((result) => {
        const idolData = [];
        likeIdolGroups.forEach((idolId) => {
          result.forEach((idol) => {
            if (idol.id === idolId) {
              idolData.push(idol);
            }
          });
        });
        setIdols(idolData);
      });
    } else {
      const getIdolGroup = getInfo("idol-groups");
      getIdolGroup.then((result) => {
        setIdols(result);
      });
    }
  }, []);

  const [groupId, setGroupId] = useState(0);

  const checkGroupHandler = (id) => {
    setGroupId(id);
    onClick(id);
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
    <div
      aria-hidden
      className={styles.categories}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
    >
      {idols !== [] && (
        <Flex justify="flex-start">
          <BtnBox
            onClick={() => {
              window.location.reload();
            }}
          >
            <Btn>
              <Image
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
                size="55px"
              />
            </Btn>
            <Text size="13px" margin="10px 0 0 0" color={grayText}>
              전체
            </Text>
          </BtnBox>
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
                <div>{idol.name}</div>
              </label>
            </IdolBox>
          ))}
          <BtnBox>
            <Btn>
              <Image
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg"
                size="30px"
              />
            </Btn>
            <Text size="13px" margin="10px 0 0 0" color={grayText}>
              그룹 편집
            </Text>
          </BtnBox>
        </Flex>
      )}
    </div>
  );
};

const IdolBox = styled.div`
  padding: 0 5px;
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

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
`;

export default IdolGroupFiltering;
