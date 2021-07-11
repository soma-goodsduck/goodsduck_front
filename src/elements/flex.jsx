/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

const Flex = (props) => {
  const { children, is_flex, is_col, justify, align, padding, margin } = props;

  const styles = {
    is_flex,
    is_col,
    justify,
    align,
    padding,
    margin,
  };
  return (
    <>
      <FlexBox {...styles}>{children}</FlexBox>
    </>
  );
};

Flex.defaultProps = {
  is_flex: true,
  is_col: false,
  justify: "center",
  align: "center",
  padding: "",
  margin: "",
};

const FlexBox = styled.div`
  ${(props) => (props.is_flex ? "display: flex;" : "")}
  ${(props) => (props.is_col ? "flex-direction: column;" : "")}
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export default Flex;
