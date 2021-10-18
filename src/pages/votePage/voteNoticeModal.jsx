/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";
import { blackBtn, white } from "../../shared/colors";

const VoteNoticeModal = ({ onOkClick }) => {
  const handleOkClcik = () => {
    onOkClick();
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text1 style={{ marginBottom: "10px" }}>⚠️</Text1>
          <Text2>10월 17일 하루동안 투표가 불가능합니다.</Text2>
        </Info>
        <Btns>
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
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 40%;
`;

const Info = styled.div`
  position: relative;
  height: 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 5px 5px 0 0;
`;

const Text1 = styled.div`
  font-size: 15px;
  text-align: center;
`;
const Text2 = styled.div`
  font-size: 17px;
  font-weight: bold;
  text-align: left;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OKBtn = styled.button`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 0 0 5px 5px;
`;

export default VoteNoticeModal;
