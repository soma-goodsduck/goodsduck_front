/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";

import { Text } from ".";

const PopUp = (props) => {
  const {
    text,
    width,
    height,
    borderRadius,
    padding,
    margin,
    bg,
    color,
    _onClick,
  } = props;

  const styles = {
    width,
    height,
    borderRadius,
    padding,
    margin,
    bg,
    color,
  };

  return (
    <PopUpBox {...styles} onClick={_onClick}>
      <Text bold>{text}</Text>
    </PopUpBox>
  );
};

PopUp.defaultProps = {
  text: null,
  width: "200px",
  height: "100px",
  borderRadius: "10px",
  padding: "20px",
  margin: "",
  bg: "#ffe200",
  color: "#222222",
  _onClick: () => {},
};

const PopUpBox = styled.button`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  z-index: 3;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
`;

export default PopUp;
