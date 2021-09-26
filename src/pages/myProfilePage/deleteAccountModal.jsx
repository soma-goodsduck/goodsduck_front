import React, { useState } from "react";

import styled from "styled-components";
import { Flex } from "../../elements";
import { grayBtn, blackBtn, white, grayBorder, red } from "../../shared/colors";

const DeleteAccountModal = ({ onOkClick, onNoClick }) => {
  const [pw, setPw] = useState("");

  const handleOkClcik = () => {
    onOkClick(pw);
  };

  const handleNoClcik = () => {
    onNoClick();
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text>회원탈퇴를 원하시는 경우,</Text>
          <Text>현재 비밀번호를 입력해주세요.</Text>
          <TextNotice>( ⚠️ 30일동안은 다시 가입할 수 없습니다.)</TextNotice>
          <Flex is_col>
            <Input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
          </Flex>
        </Info>
        <Btns>
          <NOBtn
            onClick={() => {
              handleNoClcik();
            }}
          >
            취소
          </NOBtn>
          <OKBtn
            onClick={() => {
              handleOkClcik();
            }}
          >
            확인
          </OKBtn>
        </Btns>
      </ModalBox>
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ModalBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 40%;
`;

const Info = styled.div`
  position: relative;
  height: 170px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 5px 5px 0 0;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  line-height: 1.3;
`;

const TextNotice = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 2;
  color: ${red};
`;

const Input = styled.input`
  width: 90%;
  border-radius: 5px;
  border: 1px solid ${grayBorder};
  padding: 10px 8px;
  margin-top: 15px;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OKBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 0 0 5px 0;
`;

const NOBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${grayBtn};
  border-radius: 0 0 0 5px;
`;

export default DeleteAccountModal;
