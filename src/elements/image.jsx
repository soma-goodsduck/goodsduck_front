import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, borderRadius, margin } = props;

  const styles = {
    src: src,
    size: size,
    borderRadius: borderRadius,
    margin: margin,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return <ImageRectangle {...styles}></ImageRectangle>;
  }

  return <></>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_sample.png",
  size: "24px",
  borderRadius: "",
  margin: "",
};

const ImageRectangle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};

  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  margin: ${(props) => props.margin};

  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;
`;

export default Image;
