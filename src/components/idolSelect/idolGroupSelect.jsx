import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Idol from "./idolSelect";
import { idols } from "../../shared/JsonData";

const IdolGroups = (props) => {
  const [checkedIdols, setCheckedIdols] = useState([]);

  const handleCheck = useCallback((name) => {
    setCheckedIdols(checkedIdols.push(name));
    console.log(checkedIdols);
  }, []);

  const handleUncheck = useCallback((name) => {
    const idx = checkedIdols.indexOf(name);
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
  grid-template-columns: repeat(4, 100px);
  grid-auto-rows: 100px;
`;

export default IdolGroups;
