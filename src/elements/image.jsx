import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, _className } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles} className={_className}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return <ImageRectangle {...styles} className={_className}></ImageRectangle>;
  }

  return <></>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_sample.png",
  size: 36,
  _className: "",
};

const ImageRectangle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
