import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    shape,
    src,
    size,
    width,
    height,
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
    width,
    height,
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

  if (shape === "normal") {
    return <ImageNormal {...styles} onClick={_onClick} />;
  }

  return <></>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://goods-duck.com/icon/icon_level.svg",
  size: "24px",
  width: "",
  height: "",
  borderRadius: "",
  margin: "",
  float: "",
  display: "",
  pointer: false,
  _onClick: () => {},
};

const ImageNormal = styled.img`
  position: ${(props) => props.position};

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};
  float: ${(props) => props.float};
  display: ${(props) => props.display};

  src: ${(props) => props.src};

  ${(props) => (props.pointer ? "cursor: pointer;" : "")}
`;

const ImageRectangle = styled.div`
  position: ${(props) => props.position};

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
