import React from "react";
import styled from "styled-components";
import { Flex, Text, Image } from "../../elements";
import Idol from "./idolFiltering";
import { idols } from "../../shared/JsonData";

const IdolGroupFiltering = (props) => {
  return (
    <Flex justify="flex-start">
      {idols.map((idol) => (
        <Idol key={idol.engName} idol={idol} />
      ))}
      <BtnBox>
        <AddBtn>
          <Image
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg"
            size="40px"
          ></Image>
        </AddBtn>
        <Text size="14px" margin="10px 0 " color="#222222">
          그룹 추가
        </Text>
      </BtnBox>
    </Flex>
  );
};

const BtnBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f8f8f8;
`;

export default IdolGroupFiltering;
