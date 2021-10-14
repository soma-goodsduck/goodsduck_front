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

const VotePage = (props) => {
  const dispatch = useDispatch();

  const [idols, setIdols] = useState([]);
  const [showVoteModal, setShowVoteModal] = useState(false);
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
    const result = await requestPublicData("v1/idol-groups/vote");
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
      {showLoginPopup && <LoginPopUp />}

      <VoteBox>
        <HeaderInfo text="아이돌 투표" isVote />
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

export default VotePage;
