/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./signup.module.css";

import { requestPublicData } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const IdolGroups = ({ onUpdate }) => {
  const dispatch = useDispatch();
  const idolValue = useSelector((state) => state.user.idolsForSignup);

  // 아이돌 데이터 가져오기
  const [idols, setIdols] = useState([]);

  const reqIdol = async () => {
    const result = await requestPublicData("v1/idol-groups");
    return result;
  };
  const fnEffect = async () => {
    const getIdol = await reqIdol();
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

  const checkHandler = (id) => {
    console.log(id);
    onUpdate();
    dispatch(userActions.setIdolsForSignup(id));
  };

  return (
    <IdolList>
      {idols.map((idol) => (
        <IdolBox key={idol.id} onClick={() => checkHandler(`${idol.id}`)}>
          <IdolInput
            id={idol.id}
            type="radio"
            checked={idolValue === `${idol.id}`}
            onChange={() => checkHandler(`${idol.id}`)}
          />
          <label
            htmlFor={idol.id}
            className={
              idolValue === `${idol.id}` ? styles.selectedLabel : styles.label
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
    </IdolList>
  );
};

const IdolList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 85px);
  grid-auto-rows: 115px;
`;

const IdolBox = styled.div``;

const IdolInput = styled.input`
  display: none;
`;

export default IdolGroups;
