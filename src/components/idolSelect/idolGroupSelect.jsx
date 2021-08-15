import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Idol from "./idolSelect";

import { requestPublicData } from "../../shared/axios";

const IdolGroups = ({ onUpdate }) => {
  // 아이돌 데이터 가져오기
  const [idols, setIdols] = useState([]);

  useEffect(() => {
    const getIdolGroup = requestPublicData("v1/idol-groups");
    getIdolGroup.then((result) => {
      setIdols(result);
    });
  }, []);

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

export default IdolGroups;
