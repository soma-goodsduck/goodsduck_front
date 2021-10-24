import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./filtering.module.css";
import { Flex, Text, Image } from "../../elements";
import { blackBtn, grayText } from "../../shared/colors";
import IdolEdit from "./idolEdit";

import { actionCreators as filteringActions } from "../../redux/modules/filtering";
import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const IdolGroupFiltering = ({ onClick, type }) => {
  const dispatch = useDispatch();

  // 아이돌 데이터 가져오기
  const [idols, setIdols] = useState([]);
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");
  const idolIdLS = Number(localStorage.getItem("filter_idolGroup"));

  const checkAllItems = () => {
    localStorage.removeItem("filter_idolGroup");
    localStorage.removeItem("filter_idolGroupName");
    dispatch(filteringActions.clearFiltering());
    onClick(0);
  };

  const checkGroupHandler = (id, name) => {
    onClick(id);
    localStorage.setItem("filter_idolGroup", `${id}`);
    localStorage.setItem("filter_idolGroupName", `${name}`);
  };

  const requestIdolGroup = async () => {
    const result = await requestPublicData("v1/idol-groups");
    return result;
  };
  const fnEffect = async () => {
    let idolGroups = await requestIdolGroup();

    if (idolGroups < 0) {
      history.push("/error");
      return;
    }

    if (likeIdolGroupsLS) {
      const likeIdolGroups = likeIdolGroupsLS.split(",").map(Number);

      const idolData = [];
      likeIdolGroups.forEach((idolId) => {
        idolGroups.forEach((idol) => {
          if (idol.id === idolId) {
            idolData.push(idol);
          }
        });
      });
      idolGroups = idolData;
    }

    setIdols(idolGroups);
  };
  useEffect(fnEffect, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const hideEditModal = () => {
    setShowEditModal(false);
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
      {showEditModal && (
        <IdolEdit
          _onClick={() => {
            hideEditModal();
          }}
        />
      )}
      <div
        aria-hidden
        className={
          type === "community"
            ? styles.categoriesWithCommunity
            : styles.categories
        }
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
                dispatch(filteringActions.clearFiltering());
                setShowEditModal(true);
              }}
            >
              <Btn>
                <Image
                  src="https://goods-duck.com/icon/icon_add.svg"
                  size="30px"
                />
              </Btn>
              <Text size="13px" margin="10px 0 0 0" color={grayText}>
                그룹 편집
              </Text>
            </BtnBox>
            <BtnBox
              onClick={() => {
                checkAllItems();
              }}
            >
              <Btn>
                <Image
                  src="https://goods-duck.com/sample_goodsduck.png"
                  size="55px"
                />
              </Btn>
              <Text
                size="13px"
                margin="10px 0 0 0"
                color={idolIdLS === 0 ? blackBtn : grayText}
                _className={
                  idolIdLS === 0
                    ? styles.clickIdolGroupBtn
                    : styles.idolGroupBtn
                }
              >
                전체
              </Text>
            </BtnBox>
            {idols.map((idol) => (
              <IdolBox
                key={idol.id}
                onClick={() => {
                  dispatch(filteringActions.clearFiltering());
                }}
              >
                <IdolInput
                  id={idol.id}
                  type="radio"
                  checked={idolIdLS === idol.id}
                  onChange={() => checkGroupHandler(idol.id, idol.name)}
                />
                <label
                  htmlFor={idol.id}
                  className={
                    idolIdLS === idol.id
                      ? styles.clickIdolGroupBtn
                      : styles.idolGroupBtn
                  }
                >
                  <img
                    className={
                      idolIdLS === idol.id
                        ? styles.clickIdolGroupImg
                        : styles.idolGroupImg
                    }
                    src={idol.imageUrl}
                    alt="Idol Group"
                  />
                  <div
                    className={
                      idol.id === 10 || idol.id === 14 || idol.id === 20
                        ? styles.idolGroupLongName
                        : ""
                    }
                  >
                    {idol.name}
                  </div>
                </label>
              </IdolBox>
            ))}
          </Flex>
        )}
      </div>
      {type !== "community" && (
        <NoticeBox>
          ⚠️ 단순히 투표권을 얻기 위한 사진 판매/나눔 글 등록과 단시간 내에
          삭제되는 글의 경우, 적발시 투표권이 30개 차감됩니다.
        </NoticeBox>
      )}
    </>
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

const NoticeBox = styled.div`
  width: 100vw;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #f2f3f6;
  font-size: 14px;
  text-align: left;
  line-height: 1.4;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

export default IdolGroupFiltering;
