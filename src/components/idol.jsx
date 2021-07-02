import React from "react";
import styled from "styled-components";
import { Button, Text } from "../elements";

const Idol = ({ idol }) => {
  return (
    <IdolBox>
      <Button width="50px" height="50px" borderRadius="50%" src={idol.img} />
      <Text>{idol.korName}</Text>
    </IdolBox>
  );
};

const IdolBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Idol;
