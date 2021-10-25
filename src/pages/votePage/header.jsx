/* eslint-disable no-undef */
import React, { memo, useState } from "react";

import styled from "styled-components";
import { Flex, Text, Icon } from "../../elements/index";

import { black, gray, grayBtnBorder, green, orange } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const Header = memo(({ onShareClick }) => {
  const dday = new Date("October 31, 2021, 00:00:00").getTime();
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [sec, setSec] = useState();

  setInterval(() => {
    const today = new Date().getTime();
    const gap = dday - today;
    setDay(Math.ceil(gap / (1000 * 60 * 60 * 24)));
    setHour(Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMin(Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60)));
    setSec(Math.ceil((gap % (1000 * 60)) / 1000));
  }, 1000);

  return (
    <HeaderBox>
      <Flex is_flex padding="15px 0">
        <Column1
          onClick={() => {
            history.push("/community");
          }}
        >
          <Icon
            width="12px"
            src="https://goods-duck.com/icon/icon_back_b.svg"
          />
        </Column1>
        <Column2>
          <Flex margin="0 0 10px 0">
            <Day>투표 D-{day}</Day>
            <Time>
              {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
              {sec < 10 ? `0${sec}` : sec}
            </Time>
          </Flex>
        </Column2>
        <Column3
          onClick={() => {
            onShareClick();
          }}
        >
          <Icon
            width="17px"
            src="https://goods-duck.com/icon/icon_share_black.png"
          />
        </Column3>
      </Flex>
    </HeaderBox>
  );
});

const HeaderBox = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.borderRadius};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  @media screen and (min-width: 415px) {
    width: 415px;
    left: 30%;
  }

  @media screen and (min-width: 500px) {
    left: 10%;
  }

  @media screen and (min-width: 850px) {
    left: 50%;
  }
`;

const Column1 = styled.div`
  float: left;
  width: 50px;
  cursor: pointer;
`;
const Column2 = styled.div`
  width: 100%;
  text-align: center;
  ${(props) => props.isClick && "cursor: pointer;"};
`;

const Column3 = styled.div`
  float: right;
  width: 50px;
  text-align: right;
  cursor: pointer;
`;

const Day = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${black};
  padding-right: 5px;
`;

const Time = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${black};
  padding-right: 10px;
`;

export default Header;
