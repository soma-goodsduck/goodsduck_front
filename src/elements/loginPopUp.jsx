import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { blackBtn, grayBtn, white, yellow } from "../shared/colors";

import { history } from "../redux/configureStore";
import { actionCreators as homeActions } from "../redux/modules/home";

const LoginPopUp = (props) => {
  const dispatch = useDispatch();

  const handleOkClcik = () => {
    history.replace("/login");
    dispatch(homeActions.setLoginPopup(false));
  };

  const handleNoClcik = () => {
    history.replace("/");
    dispatch(homeActions.setLoginPopup(false));
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text1>๐</Text1>
          <Text2 style={{ margin: "10px 0" }}>
            ๋ก๊ทธ์ธ์ด ํ์ํ ์๋น์ค์๋๋ค.
          </Text2>
          <Btns>
            <OKBtn
              onClick={() => {
                handleOkClcik();
              }}
            >
              ๋ก๊ทธ์ธํ๋ฌ๊ฐ๊ธฐ
            </OKBtn>
            <NOBtn
              onClick={() => {
                handleNoClcik();
              }}
            >
              ๊ทธ๋ฅ ๋๋ฌ๋ณด๊ธฐ
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

const Text1 = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const Text2 = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

const OKBtn = styled.button`
  width: 90%;
  font-size: 16px;
  padding: 15px;
  margin: 0 auto;
  background-color: ${yellow};
  color: ${blackBtn};
  border-radius: 20px;
  font-weight: bold;
`;

const NOBtn = styled.button`
  font-size: 16px;
  padding: 15px;
  color: ${grayBtn};
`;

export default LoginPopUp;
