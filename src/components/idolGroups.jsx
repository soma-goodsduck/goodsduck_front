import React, { useState } from "react";
import styled from "styled-components";
import { Button, Text } from "../elements";
import Idol from "./idol";

const IdolGroups = (props) => {
  const [idols, setIdols] = useState([
    {
      korName: "방탄소년단",
      engName: "BTS",
      img: "bts",
    },
    {
      korName: "소녀시대",
      engName: "Girls Generation",
      img: "snsd",
    },
    {
      korName: "샤이니",
      engName: "SHINee",
      img: "shinee",
    },
    {
      korName: "트와이스",
      engName: "Twice",
      img: "twice",
    },
    {
      korName: "투모로우바이투게더",
      engName: "TXT",
      img: "txt",
    },
  ]);

  return (
    <IdolList>
      {idols.map((idol) => (
        <Idol key={idol.engName} idol={idol} />
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
