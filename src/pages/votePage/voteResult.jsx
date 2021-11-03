import React from "react";

import styled from "styled-components";
import { Text } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";
import { gray } from "../../shared/colors";

const VoteResult = (props) => {
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
        {/* <Desc>
          안녕하세요. GOODSDUCK 입니다. <br />
          2021년 10월 11일부터 10월 31일까지 진행한 오픈 이벤트가
          종료되었습니다. 일부 도배성 글과 글 등록과 삭제 반복 등과 같이 정책을
          위반하는 경우로 인해 현재 투표 정산 작업 중 입니다. 따라서 투표 결과는
          11월 1일 안으로 공지될 예정이니 양해 부탁드립니다. <br />
          앞으로도 GOODSDUCK 많은 사랑과 관심 부탁드립니다 :D
        </Desc> */}
        <Desc>
          <Text bold>🎉 STAYC 축하합니다! 🎉 </Text>
          투표 1등으로 선정된 STAYC의 홍대입구역 지하철 광고를 11월 안에
          일주일동안 진행할 예정입니다.{" "}
          <Text bold margin="10px 0">
            STAYC에게 내 손으로 직접 만든 디자인의 광고를 선물하고 싶다면 11월
            1일부터 5일까지 goodsduck2021@gmail.com으로 디자인을 보내주세요!{" "}
          </Text>
          <Text bold>광고 제작 가이드</Text>
          - 사이즈 : 1920*1080px X 2개 또는 3840*1080px <br />- 포맷 : JPG 또는
          MP4
          <br />- 용량 : 20초 / 크기 제한 없음
          <Text margin="10px 0">
            응모된 디자인 중에서 심사를 통해 선정된 디자인으로 광고로 진행될
            예정입니다! STAYC에게 사진도, 전할 메세지도 직접 정할 수 있으므로
            많은 참여 부탁드립니다!! 감사합니다 :D
          </Text>
          <Text color={gray} margin="0 0 10px 0">
            (이미지 사용 및 소재에 대한 법적 책임은 모두 소재 제작자에게 있으며
            소재와 관련된 문제로 광고가 중단되더라도 당사는 환불 및 책임을 지지
            않습니다. 또한 선정된 디자인 하단에 굿즈덕 로고가 추가될 수
            있습니다.)
          </Text>
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
`;

export default VoteResult;
