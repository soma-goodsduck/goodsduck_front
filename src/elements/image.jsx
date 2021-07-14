import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    shape,
    src,
    size,
    borderRadius,
    margin,
    float,
    display,
    pointer,
    _onClick,
  } = props;

  const styles = {
    src,
    size,
    borderRadius,
    margin,
    float,
    display,
    pointer,
    _onClick,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles} onClick={_onClick} />;
  }

  if (shape === "rectangle") {
    return <ImageRectangle {...styles} onClick={_onClick} />;
  }

  return <></>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_sample.png",
  size: "24px",
  borderRadius: "",
  margin: "",
  float: "",
  display: "",
  pointer: false,
  _onClick: () => {},
};

const ImageRectangle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};
  float: ${(props) => props.float};
  display: ${(props) => props.display};

  background-image: url("${(props) => props.src}");
  background-size: cover;

  ${(props) => (props.pointer ? "cursor: pointer;" : "")}
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  margin: ${(props) => props.margin};
  float: ${(props) => props.float};
  display: ${(props) => props.display};

  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;

  ${(props) => (props.pointer ? "cursor: pointer;" : "")}
`;

export default Image;
