/* eslint-disable import/no-cycle */
import React from "react";
import styled from "styled-components";
import { blackBtn, grayBtn, white, yellow } from "../shared/colors";
import { history } from "../redux/configureStore";

const NoticeForSignupPopup = ({ handleExitClick }) => {
  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text style={{ marginTop: "15px" }}>
            죄송합니다. 현재 예기치 않은 문제로 인해 회원가입이 어렵습니다ㅜㅜ
          </Text>
          <Text style={{ margin: "5px 0" }}>
            10월 14일 오전 10시 이후 가입해주세요!
          </Text>
          <Btns>
            <OKBtn
              onClick={() => {
                history.push("/");
              }}
            >
              홈으로 돌아가기
            </OKBtn>
            <NOBtn
              onClick={() => {
                handleExitClick();
                localStorage.setItem("showNoticeTime", new Date());
              }}
            >
              더 이상 안보기
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

export default NoticeForSignupPopup;
