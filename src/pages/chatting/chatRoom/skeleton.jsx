import React from "react";
import styled, { keyframes } from "styled-components";
import { lightGray2, yellow } from "../../../shared/colors";

function Skeleton() {
  return (
    <SkeletonBox>
      <SkeletonSender />
      <SkeletonReceiver />
    </SkeletonBox>
  );
}

const sweep = keyframes`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(150%);
    }
    100% {
      transform: translateX(-100%);
    }  
`;

const SkeletonBox = styled.div`
  position: relative;
  overflow: hidden;
  height: 90px;
  margin: 20px 0;
  padding: 0 20px;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    animation: ${sweep} 2s infinite;
    background-image: linear-gradient(
      to left,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
  }
`;
const SkeletonSender = styled.div`
  height: 40px;
  width: 200px;
  border-radius: 10px 0 10px 10px;
  background-color: ${yellow};
  margin-left: auto;
  margin-bottom: 10px;
`;
const SkeletonReceiver = styled.div`
  height: 40px;
  width: 200px;
  border-radius: 0 10px 10px 10px;
  background-color: ${lightGray2};
`;

export default Skeleton;
