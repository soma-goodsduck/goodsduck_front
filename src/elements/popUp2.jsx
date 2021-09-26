/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";

const PopUp2 = (props) => {
  const { text1, text2, _onClick1, _onClick2, _onClick3, isRed, comment } =
    props;

  const styles = { isRed, comment };

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
        <ExitBtn {...styles} onClick={_onClick3}>
          닫기
        </ExitBtn>
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
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
  ${(props) => (props.comment ? "background-color: rgba(0, 0, 0, 0);" : "")}
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
  border-radius: 10px 10px 0 0;

  ${(props) =>
    props.comment ? "background-color: #222222; color: #ffffff; " : ""}
`;

const Button2 = styled.button`
  padding: 15px;
  ${(props) => (props.isRed ? "color: #e33e3e;" : "")};

  &:hover {
    color: #e33e3e;
    font-weight: bold;
  }
  border-radius: 0 0 10px 10px;

  ${(props) =>
    props.comment ? "background-color: #222222; color: #ffffff; " : ""}
`;

const ExitBtn = styled.button`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  &:hover {
    font-weight: bold;
  }

  ${(props) =>
    props.comment
      ? "background-color: #222222; color: #ffffff; font-weight:bold;"
      : ""}
`;

export default PopUp2;
