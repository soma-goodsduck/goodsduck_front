/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

const Flex = (props) => {
  const {
    children,
    is_flex,
    is_col,
    is_wrap,
    justify,
    align,
    padding,
    margin,
    bg,
    pointer,
    _className,
    _onClick,
  } = props;

  const styles = {
    is_flex,
    is_col,
    is_wrap,
    justify,
    align,
    padding,
    margin,
    bg,
    pointer,
  };
  return (
    <>
      <FlexBox {...styles} onClick={_onClick} className={_className}>
        {children}
      </FlexBox>
    </>
  );
};

Flex.defaultProps = {
  is_flex: true,
  is_col: false,
  is_wrap: false,
  justify: "center",
  align: "center",
  padding: "",
  margin: "",
  bg: "#ffffff",
  width: "100%",
  pointer: false,
  _className: "",
  _onClick: () => {},
};

const FlexBox = styled.div`
  ${(props) => (props.is_flex ? "display: flex;" : "")}
  ${(props) => (props.is_col ? "flex-direction: column;" : "")}
  ${(props) => (props.is_wrap ? "flex-wrap: wrap;" : "")}
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  ${(props) => (props.pointer ? "cursor: pointer;" : "")}
`;

export default Flex;
