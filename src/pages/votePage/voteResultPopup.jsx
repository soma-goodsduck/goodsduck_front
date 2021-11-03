/* eslint-disable import/no-cycle */
import React from "react";
import styled from "styled-components";
import { Image } from "../../elements";
import { blackBtn, gray, grayBtn, white, yellow } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const VoteResultPopup = ({ handleExitClick }) => {
  return (
    <>
      <Screen>
        <ModalBox>
          <ExitBtn
            onClick={() => {
              handleExitClick();
            }}
          />
          <Image
            src="https://goods-duck.com/image/voteResult.png"
            shape="normal"
            width="90vw"
          />
          <Btns>
            <OKBtn
              onClick={() => {
                handleExitClick();
                history.push("/vote-result");
              }}
            >
              투표 결과 보러가기
            </OKBtn>
            <NOBtn
              onClick={() => {
                handleExitClick();
                localStorage.setItem("showEventPopupTime", new Date());
              }}
            >
              오늘 하루 더 이상 안보기
            </NOBtn>
          </Btns>
        </ModalBox>
      </Screen>
    </>
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

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ModalBox = styled.div`
  width: 90vw;
  background-color: ${white};
  padding: 25px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10%;

  @media screen and (min-width: 415px) {
    width: 340px;
  }
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
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
`;

const NOBtn = styled.button`
  font-size: 16px;
  padding-top: 25px;
  color: ${gray};
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  background-image: url("https://goods-duck.com/icon/icon_delete.svg");
  background-size: cover;
  cursor: pointer;
`;

export default VoteResultPopup;
