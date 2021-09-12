import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Idol from "./editIdolBox";

import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const EditIdolGroup = ({ onUpdate }) => {
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

  const handleCheck = (id) => {
    onUpdate(true, id);
  };

  const handleUncheck = (id) => {
    onUpdate(false, id);
  };

  return (
    <IdolList>
      {idols.map((idol) => (
        <Idol
          key={idol.engName}
          idol={idol}
          onCheck={handleCheck}
          onUncheck={handleUncheck}
        />
      ))}
    </IdolList>
  );
};

const IdolList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 85px);
  grid-auto-rows: 115px;
`;

export default EditIdolGroup;
