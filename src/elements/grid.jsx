import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    is_flex_col,
    width,
    margin,
    padding,
    bg,
    children,
    _className,
  } = props;

  const styles = {
    is_flex: is_flex,
    is_flex_col: is_flex_col,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} className={_className}>
        {children}
      </GridBox>
    </React.Fragment>
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
  _className: "",
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: center; `
      : ""}
  ${(props) =>
    props.is_flex_col
      ? `display: flex; flex-direction: column; align-items: center; justify-content: center; `
      : ""}
`;

export default Grid;
