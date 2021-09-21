/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";

const PopUp3 = (props) => {
  const { text, _onClick1, _onClick2 } = props;

  return (
    <PopUpBox>
      <BtnBox>
        <Button onClick={_onClick1}>{text}</Button>
        <ExitBtn onClick={_onClick2}>닫기</ExitBtn>
      </BtnBox>
    </PopUpBox>
  );
};

PopUp3.defaultProps = {
  text: null,
  _onClick1: () => {},
  _onClick2: () => {},
};

const PopUpBox = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const BtnBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 20px;
`;

const Button = styled.button`
  background-color: #ffffff;
  padding: 17px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: #e33e3e;
  &:hover {
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

export default PopUp3;
