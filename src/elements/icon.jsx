import React from "react";
import styled from "styled-components";

const Icon = (props) => {
  const { width, height, margin, src, alt, _onClick } = props;

  const styles = {
    width,
    height,
    margin,
    src,
    alt,
  };

  return <IconBox {...styles} onClick={_onClick} />;
};

Icon.defaultProps = {
  src: "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_sample.png",
  alt: "",
  width: "28px",
  _onClick: () => {},
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
