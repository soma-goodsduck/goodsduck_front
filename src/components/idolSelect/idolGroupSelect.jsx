import React, { useState, useCallback } from "react";

import styled from "styled-components";
import Idol from "./idolSelect";
import idols from "../../shared/IdolGroupData.json";

const IdolGroups = (props) => {
  const [checkedIdols, setCheckedIdols] = useState([]);

  const handleCheck = useCallback((id) => {
    setCheckedIdols(checkedIdols.push(id));
    console.log(checkedIdols);
  }, []);

  const handleUncheck = useCallback((id) => {
    const idx = checkedIdols.indexOf(id);
    setCheckedIdols(checkedIdols.splice(idx, 1));
    console.log(checkedIdols);
  }, []);

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
  gap: 5px;
  grid-template-columns: repeat(4, 90px);
  grid-auto-rows: 130px;
`;

export default IdolGroups;
