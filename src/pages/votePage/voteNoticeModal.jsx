/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";
import { blackBtn, white, grayBtn } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const VoteNoticeModal = ({ onNoClick }) => {
  const handleNoClcik = () => {
    onNoClick();
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text1 style={{ marginBottom: "10px" }}>📢</Text1>
          <Text2>투표가 종료되었습니다.</Text2>
        </Info>
        <Btns>
          <NOBtn
            onClick={() => {
              handleNoClcik();
            }}
          >
            닫기
          </NOBtn>
          <OKBtn
            onClick={() => {
              history.push("/vote-result");
            }}
          >
            결과 확인하기
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
  text-align: center;
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
  color: ${blackBtn};
`;

export default VoteNoticeModal;
