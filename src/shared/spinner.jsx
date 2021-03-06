import React from "react";
import styled from "styled-components";

// 소셜로그인 용 스피너

function Spinner() {
  return (
    <>
      <SpinnerImg />
    </>
  );
}

const SpinnerImg = styled.div`
  display: inline-block;
  width: 150px;
  height: 150px;
  position: fixed;
  top: 40%;
  left: 30%;
  &::after {
    content: "";
    display: block;
    width: 130px;
    height: 130px;
    margin: 8px;
    border-radius: 50%;
    border: 4px solid #e5dada;
    border-color: #e5dada transparent #e5dada transparent;
    animation: Spinner 1.2s linear infinite;
  }
  @keyframes Spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
