import React from "react";

import styled from "styled-components";
import { grayBtn, blackBtn, white } from "../../shared/colors";

const ShowSettingModal = ({ onOkClick, onNoClick }) => {
  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text1>
            푸시알림 설정 변경은 &apos;설정 &gt; 알림 &gt; GOODSDUCK &gt;
            알림허용&apos;에서 할 수 있어요
          </Text1>
          <Text2 style={{ margin: "10px 0" }}>
            설정 후 반드시 앱을 재실행해주세요!
          </Text2>
        </Info>
        <Btns>
          <NOBtn
            onClick={() => {
              onNoClick();
            }}
          >
            닫기
          </NOBtn>
          <OKBtn
            onClick={() => {
              onOkClick();
            }}
          >
            설정으로 이동
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
  color: ${blackBtn};

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
  height: ${(props) => props.height};
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
`;
const Text1 = styled.div`
  font-size: 16px;
  text-align: center;
`;
const Text2 = styled.div`
  font-size: 18px;
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

export default ShowSettingModal;
