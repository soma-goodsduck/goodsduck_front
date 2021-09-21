/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

const RowScroll = (props) => {
  const { children, is_flex, is_col, padding, margin } = props;

  const styles = {
    is_flex,
    is_col,
    padding,
    margin,
  };
  return (
    <>
      <RowScrollBox {...styles}>{children}</RowScrollBox>
    </>
  );
};

RowScroll.defaultProps = {
  is_flex: true,
  is_col: false,
  padding: "",
  margin: "",
};

const RowScrollBox = styled.div`
  ${(props) => (props.is_flex ? "display: flex;" : "")}
  ${(props) => (props.is_col ? "flex-direction: column;" : "")}
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export default RowScroll;
