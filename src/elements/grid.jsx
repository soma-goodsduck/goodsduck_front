/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, is_flex_col, width, margin, padding, bg, children } = props;

  const styles = {
    is_flex,
    is_flex_col,
    width,
    margin,
    padding,
    bg,
  };
  return (
    <>
      <GridBox {...styles}>{children}</GridBox>
    </>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  is_flex_col: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? "display: flex; align-items: center; justify-content: center; "
      : ""}
  ${(props) =>
    props.is_flex_col ? "display: flex; flex-direction: column; " : ""}
`;

export default Grid;
