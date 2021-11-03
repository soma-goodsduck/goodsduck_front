/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { blackBtn, white } from "../../shared/colors";
import { Icon, LoginPopUp, Spinner, PopUp2, Text } from "../../elements";
import Header from "./header";
import Nav from "../../components/nav/nav";
import IdolForVote from "./idolForVote";
import VoteModal from "./voteModal";
import VoteConfirmModal from "./voteConfirmModal";

import { numberWithCommas } from "../../shared/functions";
import { requestPublicData, requestAuthData } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as voteActions } from "../../redux/modules/vote";
import { history } from "../../redux/configureStore";
import VoteNoticeModal from "./voteNoticeModal";

const VotePage = (props) => {
  const dispatch = useDispatch();

  const [idols, setIdols] = useState([]);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showNoVoteModal, setShowNoVoteModal] = useState(false);
  const { votedIdolId, showVoteConfirmModal, ownedVoteCount } = useSelector(
    (state) => ({
      votedIdolId: state.vote.votedIdolId,
      showVoteConfirmModal: state.vote.showConfirmModal,
      ownedVoteCount: state.vote.ownedVoteCount,
    }),
  );
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/vote");
    return result;
  };
  const reqIdolGroup = async () => {
    const result = await requestPublicData("v1/vote/idol-groups");
    return result;
  };
  const fnEffect = async () => {
    setIsLoading(true);

    const getIdolGroups = await reqIdolGroup();
    const getUserData = await reqUserData();

    if (getIdolGroups < 0 || getUserData < 0) {
      if (getUserData === -201) {
        setShowLoginPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setIsLoading(false);
    setIdols(getIdolGroups.idolGroups);
    dispatch(userActions.setTodayVotedIdol(getUserData.votedIdolGroupId));
    dispatch(voteActions.setOwnedVoteCount(getIdolGroups.haveVoteCount));
  };
  useEffect(fnEffect, []);

  const sortedIdols = idols.sort((a, b) => {
    return b.votedCount - a.votedCount;
  });

  const handleHideVoteModal = () => {
    setShowVoteModal(false);
  };

  // 공유하기
  const [showSharePopup, setShowSharePopup] = useState(false);

  const clickShare = () => {
    if (typeof navigator.share !== "undefined") {
      window.navigator.share({
        title: "GOODSDUCK",
        text: "굿즈덕에서 투표하고 내 아이돌에게 광고 선물하자!",
        url: window.location.href,
      });
      return;
    }

    setShowSharePopup(true);
  };

  const handleShareByKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "GOODSDUCK",
        description: "굿즈덕에서 투표하고 내 아이돌에게 광고 선물하자!",
        imageUrl: "https://goods-duck.com/image/event.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
    setShowSharePopup(false);
  };

  const handleShareByTwitter = () => {
    const sendText = "GOODSDUCK";
    const sendUrl = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`,
    );
    setShowSharePopup(false);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {showSharePopup && (
        <PopUp2
          text1="카카오톡으로 공유하기"
          text2="트위터로 공유하기"
          _onClick1={() => handleShareByKakao()}
          _onClick2={() => handleShareByTwitter()}
          _onClick3={() => setShowSharePopup(false)}
        />
      )}
      {showVoteConfirmModal && (
        <VoteConfirmModal onExitClick={handleHideVoteModal} />
      )}
      {showVoteModal && (
        <VoteModal
          onOkClick={() => {
            setShowVoteModal(false);
          }}
          onNoClick={handleHideVoteModal}
        />
      )}
      {showNoVoteModal && (
        <VoteNoticeModal
          onNoClick={() => {
            setShowNoVoteModal(false);
          }}
        />
      )}
      {showLoginPopup && <LoginPopUp />}

      <VoteBox>
        <Header
          onShareClick={() => {
            clickShare();
          }}
        />
        {/* <NoticeBox>
          👉 앱에 접속하면 하루에 <strong>투표권 2개</strong>
          <br />
          👉 굿즈 판매 거래글을 올릴 때마다 <strong>투표권 10개</strong>
        </NoticeBox>
        <NoticeBox>
          안녕하세요. GOODSDUCK 입니다. <br />
          2021년 10월 11일부터 10월 31일까지 진행한 오픈 이벤트가
          종료되었습니다. 일부 도배성 글과 글 등록과 삭제 반복 등과 같이 정책을
          위반하는 경우로 인해 현재 투표 정산 작업 중 입니다. 따라서 투표 결과는
          11월 1일 안으로 공지될 예정이니 양해 부탁드립니다. <br />
          앞으로도 GOODSDUCK 많은 사랑과 관심 부탁드립니다 :D
        </NoticeBox>
        */}
        <NoticeBox>
          안녕하세요. GOODSDUCK 입니다. <br />
          2021년 10월 11일부터 10월 31일까지 진행한 오픈 이벤트가
          종료되었습니다. 일부 도배성 글(ex. 판매글의 세부 설명이 없는 경우)과
          글 등록과 삭제 반복 등과 같이 정책을 위반하는 경우, 투표권을
          무효화했습니다.
          <br />
          <Text bold size="14px" margin="5px 0">
            2021.10.31 24:00 기준으로 판단했을 때 정책을 위반한 경우는 다음과
            같습니다. <br />
            오마이걸 투표수 = 6,647표(기존 투표수 10,617표 - 도배성 굿즈 2,050표
            - 삭제된 굿즈 1,920표) <br />
            스테이씨 투표수 = 7,835표(기존 투표수 12,625표 - 도배성 굿즈 3,940표
            - 삭제된 굿즈 850표) <br />
          </Text>
          <Text size="14px" margin="5px 0">
            곧 옥외광고 이벤트로 다시 찾아올테니 기다려주세요! <br />
            어뷰징 행위에 대한 강력한 조치방안 또한 가져오겠습니다!
          </Text>
          앞으로도 GOODSDUCK 많은 사랑과 관심 부탁드립니다 💛
        </NoticeBox>
        <ResultBtn
          onClick={() => {
            history.push("/vote-result");
          }}
        >
          투표 결과 및 광고 제작 안내
        </ResultBtn>
        {/* <Notice>
          내 투표권 : {numberWithCommas(Number(ownedVoteCount))}
          <Icon
            width="18px"
            src="https://goods-duck.com/icon/icon_heart_click.svg"
            margin="0 0 0 2px"
          />
        </Notice> */}
        {sortedIdols &&
          sortedIdols.map((idol, index) => (
            <IdolForVote
              idol={idol}
              ranking={index}
              key={idol.id}
              onVote={() => {
                // setShowVoteModal(true);
                setShowNoVoteModal(true);
              }}
              votedIdolId={votedIdolId}
            />
          ))}
      </VoteBox>
      <Nav />
    </>
  );
};

const VoteBox = styled.div`
  margin-bottom: 100px;
  padding-top: 55px;
`;

const Notice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-size: 14px;
  font-weight: 500;
  color: ${blackBtn};
  padding-right: 20px;
  margin-bottom: 15px;
`;

const NoticeBox = styled.div`
  width: 100vw;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #f2f3f6;
  font-size: 14px;
  text-align: left;
  line-height: 1.4;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ResultBtn = styled.div`
  width: 80vw;
  max-width: 300px;
  font-size: 16px;
  padding: 15px;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
`;

export default VotePage;
