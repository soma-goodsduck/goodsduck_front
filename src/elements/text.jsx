/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, is_long, _className } = props;

  const styles = {
    bold,
    color,
    size,
    margin,
    is_long,
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
  margin: false,
  is_long: false,
  _className: "",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.is_long
      ? "white-space: nowrap; overflow:hidden; text-overflow: ellipsis; "
      : ""}
`;

export default Text;
