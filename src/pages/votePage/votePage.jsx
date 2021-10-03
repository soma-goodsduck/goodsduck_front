import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import Nav from "../../components/nav/nav";
import IdolForVote from "./idolForVote";
import { DoubleCheckModal, DoubleCheckModal2 } from "../../elements";

import {
  requestPublicData,
  requestAuthData,
  postAction,
} from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";
import { gray } from "../../shared/colors";

const VotePage = (props) => {
  const dispatch = useDispatch();

  const [idols, setIdols] = useState([]);
  const [idolId, setIdolId] = useState(0); // 투표하려고하는 아이돌 ID
  const [idolName, setIdolName] = useState(""); // 투표하려고하는 아이돌 이름
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showNoVoteModal, setShowNoVoteModal] = useState(false);
  const votedIdolId = useSelector((state) => state.user.votedIdolId); // 투표한 아이돌 그룹

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/vote");
    return result;
  };
  const reqIdolGroup = async () => {
    const result = await requestPublicData("v1/idol-groups");
    return result;
  };
  const fnEffect = async () => {
    const idolGroups = await reqIdolGroup();
    const userData = await reqUserData();
    console.log(userData);

    if (idolGroups < 0 || userData < 0) {
      history.push("/error");
      return;
    }

    setIdols(idolGroups);
    dispatch(userActions.setTodayVotedIdol(userData.votedIdolGroupId));
  };
  useEffect(fnEffect, []);

  const sortedIdols = idols.sort((a, b) => {
    return b.votedCount - a.votedCount;
  });

  const handleShowVoteModal = (_idolId, _idolName) => {
    if (votedIdolId === 0) {
      setShowVoteModal(true);
      setIdolId(_idolId);
      setIdolName(_idolName);
    } else {
      setShowNoVoteModal(true);
    }
  };
  const handleHideVoteModal = () => {
    setShowVoteModal(false);
  };

  const reqVote = async (_idolId) => {
    const result = await postAction(`v1/idol-groups/${_idolId}/vote`);
    return result;
  };
  const handleVote = async () => {
    const clickAction = await reqVote(idolId);
    if (clickAction < 0) {
      if (clickAction === -201) {
        return;
      }
      history.push("/error");
      return;
    }

    window.location.reload();
  };

  return (
    <>
      {showVoteModal && (
        <DoubleCheckModal
          text2={`${idolName} 투표`}
          text3="투표는 1일 1회만 가능하며, 수정이 불가능합니다."
          warning
          onOkClick={handleVote}
          onNoClick={handleHideVoteModal}
        />
      )}
      {showNoVoteModal && (
        <DoubleCheckModal2
          text="이미 투표했습니다. 내일 다시 투표해주세요!"
          onOkClick={() => {
            setShowNoVoteModal(false);
          }}
        />
      )}
      <VoteBox>
        <HeaderInfo text="아이돌 투표" isVote />
        <Notice>투표는 하루에 한 번만 가능하며, 0시에 초기화됩니다.</Notice>
        {sortedIdols &&
          sortedIdols.map((idol, index) => (
            <IdolForVote
              idol={idol}
              ranking={index}
              key={idol.id}
              onVote={handleShowVoteModal}
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
  font-size: 14px;
  text-align: right;
  color: ${gray};
  padding-right: 10px;
  margin-bottom: 25px;
`;

export default VotePage;
