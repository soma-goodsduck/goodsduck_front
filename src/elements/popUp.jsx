/* eslint-disable import/no-cycle */
import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { green } from "../shared/colors";

import { history } from "../redux/configureStore";

import { actionCreators as userActions } from "../redux/modules/user";

const PopUp = (props) => {
  const dispatch = useDispatch();

  const {
    text1,
    text2,
    width,
    height,
    borderRadius,
    padding,
    margin,
    bg,
    color,
    isBold,
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
    isBold,
  };

  const noLogin = () => {
    dispatch(userActions.noShowPopupAction());
    history.push("/");
  };

  return (
    <PopUpBox {...styles}>
      <Text
        {...styles}
        onClick={() => {
          _onClick();
        }}
      >
        {text1}
      </Text>
      <ExitText onClick={() => noLogin()}>{text2}</ExitText>
    </PopUpBox>
  );
};

PopUp.defaultProps = {
  text1: null,
  text2: null,
  width: "200px",
  height: "100px",
  borderRadius: "10px",
  padding: "20px",
  margin: "",
  bg: "#ffe200",
  color: "#222222",
  isBold: false,
  _onClick: () => {},
};

const PopUpBox = styled.div`
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

  -webkit-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
`;

const Text = styled.button`
  font-family: "Do Hyeon", sans-serif;
  font-size: 18px;
  ${(props) => (props.isBold ? "font-weight: bold; " : "")}
  margin: 20px 0;
  transition: transform 100ms ease-in;

  &:hover {
    color: ${green};
    transform: scale(1.1);
  }
`;

const ExitText = styled.button`
  font-size: 14px;
`;

export default PopUp;
