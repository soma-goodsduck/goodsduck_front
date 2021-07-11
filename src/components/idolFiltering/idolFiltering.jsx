import React from "react";
import styled from "styled-components";
import { Text, Image } from "../../elements";

const IdolFiltering = ({ idol }) => {
  return (
    <IdolBox>
      <Image src={idol.img} size="50px" />
      <Text size="13px" margin="10px 0 0 0 ">
        {idol.korName}
      </Text>
    </IdolBox>
  );
};

const IdolBox = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default IdolFiltering;
