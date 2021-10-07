/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";
import { Flex, Spinner } from "../../elements";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { requestPublicData } from "../../shared/axios";

const IdolSelect = ({ history }) => {
  const dispatch = useDispatch();
  const idolValue = useSelector((state) => state.newItem.idol_group_id);
  const [isLoading, setIsLoading] = useState(true);

  // 아이돌 데이터 가져오기
  const [idols, setIdols] = useState([]);

  const reqIdol = async () => {
    const result = await requestPublicData("v1/idol-groups");
    return result;
  };
  const fnEffect = async () => {
    const getIdol = await reqIdol();
    setIsLoading(false);

    if (getIdol < 0) {
      history.push("/error");
      return;
    }
    setIdols(getIdol);
  };
  useEffect(fnEffect, []);

  if (!idols) {
    return null;
  }

  // 아이돌 선택
  const [groupId, setGroupId] = useState(0);

  const checkGroupHandler = (id, name) => {
    setGroupId(id);
    dispatch(newItemActions.setIdolGroup(id, name));
    history.push("/select-idol-member");
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <HeaderInfo text="아이돌 그룹" padding="0 16px" isUploading />
          <IdolContainer>
            <Flex is_flex is_wrap>
              {idols.map((idol) => (
                <IdolBox key={idol.id}>
                  <IdolInput
                    id={idol.id}
                    type="radio"
                    checked={idolValue === idol.id}
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
                    {idol.name}
                  </label>
                </IdolBox>
              ))}
            </Flex>
          </IdolContainer>
        </>
      )}
    </>
  );
};

const IdolContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 65px;
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
