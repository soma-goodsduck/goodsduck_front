import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { blackBtn } from "../../shared/colors";
import { Icon, LoginPopUp, Spinner } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";
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

  return (
    <>
      {isLoading && <Spinner />}
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
          onOkClick={() => {
            setShowNoVoteModal(false);
          }}
        />
      )}
      {showLoginPopup && <LoginPopUp />}

      <VoteBox>
        <HeaderInfo text="아이돌 투표" isVote />
        <NoticeBox>
          👉 앱에 접속하면 하루에 <strong>투표권 2개</strong>
          <br />
          👉 굿즈 판매 거래글을 올릴 때마다 <strong>투표권 10개</strong>
        </NoticeBox>
        <Notice>
          내 투표권 : {numberWithCommas(Number(ownedVoteCount))}
          <Icon
            width="18px"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart_click.svg"
            margin="0 0 0 2px"
          />
        </Notice>
        {sortedIdols &&
          sortedIdols.map((idol, index) => (
            <IdolForVote
              idol={idol}
              ranking={index}
              key={idol.id}
              onVote={() => {
                setShowVoteModal(true);
                // setShowNoVoteModal(true);
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

export default VotePage;
