import React from "react";
import styled from "styled-components";
import { yellow } from "../shared/color";

const Button = (props) => {
  const {
    text,
    width,
    height,
    borderRadius,
    padding,
    margin,
    bg,
    color,
    src,
    _className,
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
    src,
  };

  return (
    <>
      <ElButton {...styles} className={_className} onClick={_onClick}>
        {text}
      </ElButton>
    </>
  );
};

Button.defaultProps = {
  text: null,
  width: "100%",
  height: "",
  borderRadius: "",
  padding: "",
  margin: "",
  bg: `${yellow}`,
  color: "black",
  src: "",
  _className: "",
  _onClick: () => {},
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Button;
