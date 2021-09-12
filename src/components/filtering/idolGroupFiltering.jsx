import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./filtering.module.css";
import { Flex, Text, Image } from "../../elements";
import { grayText } from "../../shared/colors";
import IdolEdit from "./idolEdit";

import { actionCreators as filteringActions } from "../../redux/modules/filtering";
import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const IdolGroupFiltering = ({ onClick }) => {
  const dispatch = useDispatch();

  // 아이돌 데이터 가져오기
  const [idols, setIdols] = useState([]);
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");
  const [groupId, setGroupId] = useState(0);

  const checkGroupHandler = (id, name) => {
    setGroupId(id);
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
    setGroupId(localStorage.getItem("filter_idolGroup"));
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
                localStorage.removeItem("filter_idolGroup");
                dispatch(filteringActions.clearFiltering());
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
              <IdolBox
                key={idol.id}
                onClick={() => {
                  dispatch(filteringActions.clearFiltering());
                }}
              >
                <IdolInput
                  id={idol.id}
                  type="radio"
                  checked={groupId === idol.id}
                  onChange={() => checkGroupHandler(idol.id, idol.name)}
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
                  <div
                    className={idol.id === 10 ? styles.idolGroupLongName : ""}
                  >
                    {idol.name}
                  </div>
                </label>
              </IdolBox>
            ))}
            <BtnBox
              onClick={() => {
                dispatch(filteringActions.clearFiltering());
                setShowEditModal(true);
              }}
            >
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

export default IdolGroupFiltering;
