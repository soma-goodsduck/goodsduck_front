/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";

import styled from "styled-components";

const PriceFilteringModal = ({
  sortingNew,
  sortingLowPrice,
  sortingHighPrice,
  clickExit,
}) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const styles = { isMobile };

  return (
    <PopUpBox {...styles}>
      <BtnBox>
        <Btns>
          <Button1 onClick={sortingNew}>최신순</Button1>
          <Button1 onClick={sortingLowPrice}>낮은 가격순</Button1>
          <Button2 onClick={sortingHighPrice}>높은 가격순</Button2>
        </Btns>
        <ExitBtn onClick={clickExit}>닫기</ExitBtn>
      </BtnBox>
    </PopUpBox>
  );
};

const PopUpBox = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 5;
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

export default PriceFilteringModal;
