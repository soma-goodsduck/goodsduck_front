import React from "react";
import styled from "styled-components";
import { Text, Image } from "../../elements";

const IdolFiltering = ({ idol }) => {
  return (
    <IdolBox>
      <Image src={idol.img} size="50px"></Image>
      <Text size="14px" margin="10px 0 ">
        {idol.korName}
      </Text>
    </IdolBox>
  );
};

const IdolBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
`;

export default IdolFiltering;
