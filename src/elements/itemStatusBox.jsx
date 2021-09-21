import React from "react";
import styled from "styled-components";
import { white } from "../shared/colors";

const ItemStatusBox = (props) => {
  const { text, size, mSize, fontSize, radius } = props;

  const styles = {
    size,
    mSize,
    fontSize,
    radius,
  };

  return (
    <>
      <Box {...styles}>
        <GoodsduckIcon />
        <Text {...styles}>{text}</Text>
      </Box>
    </>
  );
};

ItemStatusBox.defaultProps = {
  size: "185px",
  mSize: "45vw",
  fontSize: "16px",
  radius: "10px",
};

const Box = styled.div`
  position: absolute;

  --mSize: ${(props) => props.mSize};
  width: var(--mSize);
  height: var(--mSize);
  border-radius: ${(props) => props.radius};
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 415px) {
    --size: ${(props) => props.size};
    width: var(--size);
    height: var(--size);
  }
`;

const Text = styled.div`
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  color: ${white};
  margin-top: 8px;

  @media screen and (min-width: 415px) {
    margin-top: 10px;
  }
`;

const GoodsduckIcon = styled.div`
  width: 24px;
  height: 24px;

  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck.png");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 30px;
    height: 30px;
  }
`;

export default ItemStatusBox;
