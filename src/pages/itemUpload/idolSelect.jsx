/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";

import { Flex, Button } from "../../elements";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { history } from "../../redux/configureStore";

import idols from "../../shared/IdolGroupData.json";

const IdolSelect = () => {
  const dispatch = useDispatch();

  const [groupId, setGroupId] = useState(0);

  const checkGroupHandler = (id) => {
    setGroupId(id);
    dispatch(newItemActions.setIdolAction(id));
  };

  const selectMember = () => {
    if (!groupId) {
      window.alert("아이돌 그룹을 선택해주세요");
      return;
    }
    history.push("/idolMemberSelect");
  };

  return (
    <Flex is_flex is_wrap>
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
              className={styles.idolGroupImg}
              src={idol.imageUrl}
              alt="Idol Group"
            />
            {idol.engName}
          </label>
        </IdolBox>
      ))}
      <Button
        text="NEXT"
        padding="10px"
        margin="30px 0 0 0 "
        _onClick={() => {
          selectMember();
        }}
      />
    </Flex>
  );
};

const IdolBox = styled.div`
  width: 110px;
  height: 140px;
  padding: 10px;
  text-align: center;
`;
const IdolInput = styled.input`
  display: none;
`;

export default IdolSelect;
