/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";

import { Flex } from "../../elements";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { history } from "../../redux/configureStore";

import idols from "../../shared/IdolGroupData.json";

const IdolSelect = () => {
  const dispatch = useDispatch();

  const [groupId, setGroupId] = useState(0);
  const [nextOK, setNextOK] = useState(false);

  useEffect(() => {
    if (groupId) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [groupId]);

  const checkGroupHandler = (id, name) => {
    setGroupId(id);
    dispatch(newItemActions.setIdolAction(id, name));
  };

  const selectGroup = () => {
    if (!groupId) {
      return;
    }
    history.push("/idolMemberSelect");
  };

  return (
    <>
      <HeaderInfo text="아이돌 그룹" padding="0 16px" />
      <IdolContainer>
        <div>
          <div className={styles.detailText}>전체 아이돌 그룹</div>
          <Flex is_flex is_wrap>
            {idols.map((idol) => (
              <IdolBox key={idol.id}>
                <IdolInput
                  id={idol.id}
                  type="radio"
                  checked={groupId === idol.id}
                  onChange={() => checkGroupHandler(idol.id, idol.engName)}
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
                    className={styles.idolGroupImg}
                    src={idol.imageUrl}
                    alt="Idol Group"
                  />
                  {idol.engName}
                </label>
              </IdolBox>
            ))}
          </Flex>
        </div>
        <ButtonBox>
          <button
            className={nextOK ? styles.nextOKBtn : styles.nextBtn}
            type="button"
            onClick={() => {
              selectGroup();
            }}
          >
            다음
          </button>
        </ButtonBox>
      </IdolContainer>
    </>
  );
};

const IdolContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IdolBox = styled.div`
  width: 90px;
  height: 120px;
  padding: 5px;
  text-align: center;
`;
const IdolInput = styled.input`
  display: none;
`;

const ButtonBox = styled.div`
  width: 100%;
  padding: 0 16px;
`;

export default IdolSelect;
