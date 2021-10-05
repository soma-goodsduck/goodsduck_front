import React from "react";
import styled from "styled-components";
import { Icon } from ".";
import { blackBtn, grayBtn, white, yellow } from "../shared/colors";

const AppDownloadPopup = ({ downloadLink, handleExitClcik }) => {
  return (
    <Screen>
      <ModalBox>
        <Info>
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck.png"
            width="40px"
          />
          <Text style={{ margin: "10px 0" }}>
            GOODSDUCK을 앱으로도 만나볼 수 있어요!
          </Text>
          <Btns>
            <a href={downloadLink}>
              <OKBtn>앱으로 보기</OKBtn>
            </a>
            <NOBtn
              onClick={() => {
                handleExitClcik();
              }}
            >
              오늘은 그냥 볼래요
            </NOBtn>
          </Btns>
        </Info>
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
  height: 230px;
  background-color: ${blackBtn};
  color: ${white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const OKBtn = styled.button`
  width: 80vw;
  max-width: 300px;
  font-size: 16px;
  padding: 15px;
  margin: 0 auto;
  background-color: ${yellow};
  color: ${blackBtn};
  border-radius: 20px;
  font-weight: bold;

  @media screen and (min-width: 415px) {
    width: 300px;
  }
`;

const NOBtn = styled.button`
  font-size: 16px;
  padding: 15px;
  color: ${grayBtn};
`;

export default AppDownloadPopup;
