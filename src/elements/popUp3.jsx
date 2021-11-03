/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";
import { blackBtn } from "../shared/colors";

const PopUp3 = (props) => {
  const { text, _onClick1, _onClick2, comment } = props;

  const styles = { comment };

  return (
    <PopUpBox {...styles}>
      <BtnBox>
        <Button onClick={_onClick1} {...styles}>
          {text}
        </Button>
        <ExitBtn onClick={_onClick2} {...styles}>
          닫기
        </ExitBtn>
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

const Button = styled.button`
  background-color: #ffffff;
  padding: 17px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: #e33e3e;

  ${(props) =>
    props.comment
      ? "background-color: #222222; color: #ffe200; font-weight:bold;"
      : ""}
`;

const ExitBtn = styled.button`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  color: ${blackBtn};

  ${(props) =>
    props.comment
      ? "background-color: #222222; color: #ffffff; font-weight:bold;"
      : ""}
`;

export default PopUp3;
