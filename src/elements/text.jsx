/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    medium,
    bold,
    color,
    size,
    children,
    height,
    margin,
    is_long,
    is_center,
    _className,
  } = props;

  const styles = {
    medium,
    bold,
    color,
    size,
    height,
    margin,
    is_long,
    is_center,
  };
  return (
    <P {...styles} className={_className}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#000000",
  size: "16px",
  height: "",
  margin: "",
  is_long: false,
  is_center: false,
  _className: "",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "")};
  font-weight: ${(props) => (props.medium ? "500" : "")};
  line-height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.is_long
      ? "white-space: nowrap; overflow:hidden; text-overflow: ellipsis; "
      : ""}
  ${(props) => (props.is_center ? "text-align: center; " : "")}
`;

export default Text;
