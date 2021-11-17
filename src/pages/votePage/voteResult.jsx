import React from "react";

import styled from "styled-components";
import { Text, Image } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

const VoteResult = (props) => {
  const screen = window.screen.width;

  return (
    <>
      <HeaderInfo text="투표 결과" />
      <ResultIdol>
        <ImgBox>
          <div style={{ position: "relative" }}>
            <WinnerImg />
          </div>
          <IdolImgBox>
            <IdolImg />
          </IdolImgBox>
        </ImgBox>
        <Text bold size="24px">
          STAYC
        </Text>
        <Text medium size="15px" margin="10px 0">
          7,835표
        </Text>
      </ResultIdol>
      <ResultInfo>
        <Desc>
          <Text bold margin="10px 0">
            🎉 STAYC 축하합니다! 🎉{" "}
          </Text>
          <br />
          <Text bold margin="10px 0">
            광고 안내
          </Text>
          - 기간 : 11월 10일 ~ 11월 16일 (일주일)
          <br />- 위치 : 홍대입구역 (공항철도)
          <Image
            shape="normal"
            src="https://goods-duck.com/image/adsImg.png"
            width={screen > 415 ? "345px" : "85vw"}
            margin="10px 20px 10px 20px;"
            borderRadius="10px"
          />
          <Text bold margin="20px 0 0 0 ">
            앞으로도 GOODSDUCK 많은 사랑과 관심 부탁드립니다 💛
          </Text>
        </Desc>
      </ResultInfo>
    </>
  );
};

const ResultIdol = styled.div`
  width: 100vw;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  width: 100%;
`;

const WinnerImg = styled.div`
  width: 90vw;
  height: 70vw;
  background-image: url("https://goods-duck.com/icon/icon_winner.svg");
  background-size: cover;
  postion: relative;
  margin: 0 auto;

  @media screen and (min-width: 415px) {
    width: 400px;
    height: 300px;
  }
`;

const IdolImgBox = styled.div`
  position: absolute;
  top: 70px;
  left: 100px;

  @media screen and (min-width: 415px) {
    top: 80px;
  }
`;

const IdolImg = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: url("https://goods-duck.com/image/idol/artist_stayc.jpg");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 210px;
    height: 210px;
  }
`;

const ResultInfo = styled.div`
  background-color: rgba(255, 226, 0, 0.1);

  margin: 20px;
  padding: 30px 15px;
  line-height: 1.5;

  @media screen and (min-width: 415px) {
    width: 375px;
  }
`;

const Desc = styled.div`
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default VoteResult;
