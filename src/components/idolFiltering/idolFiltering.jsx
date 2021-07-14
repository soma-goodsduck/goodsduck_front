import React from "react";
import styled from "styled-components";
import { Text, Image } from "../../elements";

const IdolFiltering = ({ idol }) => {
  return (
    <IdolBox>
      <Image src={idol.imageUrl} size="65px" />
      <Text size="13px" margin="10px 0 0 0 ">
        {idol.engName}
      </Text>
    </IdolBox>
  );
};

const IdolBox = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default IdolFiltering;
