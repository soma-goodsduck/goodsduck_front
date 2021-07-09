import React from "react";
import styled from "styled-components";

const Icon = (props) => {
  const { width, height, margin, src, alt } = props;

  const styles = {
    width: width,
    height: height,
    margin: margin,
    src: src,
    alt: alt,
  };

  return <IconBox {...styles}></IconBox>;
};

Icon.defaultProps = {
  src: "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_sample.png",
  alt: "",
  width: "28px",
};

const IconBox = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};

  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;

export default Icon;
