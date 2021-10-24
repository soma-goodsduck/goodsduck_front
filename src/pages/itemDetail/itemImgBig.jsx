import React from "react";
import styled from "styled-components";

const ItemImgBig = ({ imgUrl, nickName, _onClick }) => {
  return (
    <>
      <Screen>
        <ExitBtn onClick={_onClick} />
        <Img src={imgUrl} />
        <Watermark>ⓒ GOODSDUCK ({nickName})</Watermark>
      </Screen>
    </>
  );
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const Img = styled.div`
  width: 100vw;

  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 100px;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const Watermark = styled.span`
  position: absolute;
  top: 80vw;
  color: gray;
  opacity: 0.4;
  font-size: 5vw;
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-image: url("https://goods-duck.com/icon/icon_delete.svg");
  background-size: cover;
  cursor: pointer;
`;

export default ItemImgBig;
