import React from "react";
import styled from "styled-components";

const Flex = (props) => {
  const { children, is_flex, direction, justify, align, padding, margin } =
    props;

  const styles = {
    is_flex: is_flex,
    direction: direction,
    justify: justify,
    align: align,
    padding: padding,
    margin: margin,
  };
  return (
    <React.Fragment>
      <FlexBox {...styles}>{children}</FlexBox>
    </React.Fragment>
  );
};

Flex.defaultProps = {
  is_flex: true,
  direction: "",
  justify: "center",
  align: "center",
  padding: "",
  margin: "",
};

const FlexBox = styled.div`
  ${(props) => (props.is_flex ? `display: flex;` : "")}
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export default Flex;
