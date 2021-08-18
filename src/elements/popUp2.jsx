/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";

import styled from "styled-components";

const PopUp2 = (props) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const { text1, text2, _onClick1, _onClick2, _onClick3, isRed } = props;

  const styles = { isMobile, isRed };

  return (
    <PopUpBox {...styles}>
      <BtnBox>
        <Btns>
          <Button1 {...styles} onClick={_onClick1}>
            {text1}
          </Button1>
          <Button2 {...styles} onClick={_onClick2}>
            {text2}
          </Button2>
        </Btns>
        <ExitBtn onClick={_onClick3}>닫기</ExitBtn>
      </BtnBox>
    </PopUpBox>
  );
};

PopUp2.defaultProps = {
  text1: null,
  text2: null,
  _onClick1: () => {},
  _onClick2: () => {},
  _onClick3: () => {},
};

const PopUpBox = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  ${(props) => (props.isMobile ? "width: 100%" : "width: 415px")};
  height: 150%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;
`;

const BtnBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 20px;
`;

const Btns = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Button1 = styled.button`
  padding: 15px;
  border-bottom: 1px solid #dddddd;
  &:hover {
    font-weight: bold;
  }
`;

const Button2 = styled.button`
  padding: 15px;
  ${(props) => (props.isRed ? "color: #e33e3e;" : "")};

  &:hover {
    color: #e33e3e;
    font-weight: bold;
  }
`;

const ExitBtn = styled.button`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  &:hover {
    font-weight: bold;
  }
`;

export default PopUp2;
