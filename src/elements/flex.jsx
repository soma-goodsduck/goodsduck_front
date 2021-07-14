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
  };
  return (
    <>
      <FlexBox {...styles} onClick={_onClick}>
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
`;

export default Flex;
