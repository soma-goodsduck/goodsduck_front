import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Icon, Text } from "../../elements";
import {
  grayBtn,
  blackBtn,
  white,
  grayBtnText,
  yellow,
  gray,
} from "../../shared/colors";
import { numberWithCommas } from "../../shared/functions";

import { postAction } from "../../shared/axios";
import { actionCreators as voteActions } from "../../redux/modules/vote";
import { history } from "../../redux/configureStore";

const VoteModal = ({ onOkClick, onNoClick }) => {
  const dispatch = useDispatch();

  const [usingVoteCount, setUsingVoteCount] = useState(0);
  const { voteIdolId, voteIdolName, ownedVoteCount } = useSelector((state) => ({
    voteIdolId: state.vote.votedIdolId,
    voteIdolName: state.vote.votedIdolName,
    ownedVoteCount: state.vote.ownedVoteCount,
  })); // 투표할 아이돌 정보

  const handleVotingPlusOne = () => {
    if (usingVoteCount + 1 > ownedVoteCount) {
      return;
    }
    setUsingVoteCount(usingVoteCount + 1);
  };

  const handleVotingAll = () => {
    setUsingVoteCount(ownedVoteCount);
  };

  const handleNoClcik = () => {
    onNoClick();
  };

  const reqVote = async () => {
    const result = await postAction(
      `v1/idol-groups/${voteIdolId}/vote?voteCount=${usingVoteCount}`,
    );
    return result;
  };
  const handleVote = async () => {
    if (usingVoteCount === 0) {
      return;
    }
    const _handleVote = await reqVote();
    if (_handleVote < 0) {
      history.push("/error");
      return;
    }

    dispatch(voteActions.setVotedCount(_handleVote.response.voteCount));
    dispatch(
      voteActions.setOwnedVoteCount(
        ownedVoteCount - _handleVote.response.voteCount,
      ),
    );
    dispatch(voteActions.setShowConfirmModal(true));
    onOkClick();
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Title>{voteIdolName} 투표하기</Title>
          <VotingRightsBox>
            <Text>보유중인 투표권</Text>
            <VotingRightsCount>
              {numberWithCommas(Number(ownedVoteCount))}
              <Icon
                width="20px"
                src="https://goods-duck.com/icon/icon_heart_click.svg"
              />
            </VotingRightsCount>
          </VotingRightsBox>
          <VotingBox>
            <VotingCountBox>
              <Text>투표할 갯수</Text>
              <VotingRightsCount>
                {numberWithCommas(Number(usingVoteCount))}
                <Icon
                  width="20px"
                  src="https://goods-duck.com/icon/icon_heart_click.svg"
                />
              </VotingRightsCount>
            </VotingCountBox>
            <VoitingPlusBtns>
              <VoitingPlusBtn
                onClick={() => {
                  handleVotingPlusOne();
                }}
              >
                + 1
              </VoitingPlusBtn>
              <VoitingPlusBtn
                onClick={() => {
                  handleVotingAll();
                }}
              >
                ALL
              </VoitingPlusBtn>
            </VoitingPlusBtns>
          </VotingBox>
          <Flex is_flex>
            <Icon
              width="15px"
              src="https://goods-duck.com/icon/icon_alert_gray.png"
            />
            <Warning>투표는 수정이 불가능합니다.</Warning>
          </Flex>
        </Info>
        <Btns>
          <NOBtn
            onClick={() => {
              handleNoClcik();
            }}
          >
            취소
          </NOBtn>
          <OKBtn
            onClick={() => {
              handleVote();
            }}
          >
            확인
          </OKBtn>
        </Btns>
      </ModalBox>
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: ${blackBtn};

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ModalBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 40%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: ${(props) => props.height};
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px 5px 0 0;
`;

const VotingRightsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 300px;
  height: 60px;
  background-color: ${yellow};
  color: #080908;
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
  font-weight: 500;
`;

const VotingRightsCount = styled.div`
  display: flex;
  align-items: center;

  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const VotingBox = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);

  width: 300px;
  border: 1px solid ${gray};
  color: #080908;
  border-radius: 5px;
  font-weight: 500;
  margin: 15px 0 20px 0;
`;

const VotingCountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  font-size: 18px;
  text-align: center;
`;

const VoitingPlusBtns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  width: 300px;
  height: 50px;
  border-top: 1px solid ${gray};
  color: #080908;
  font-weight: 500;
`;

const VoitingPlusBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-weight: 500;
  font-size: 18px;
  color: #080908;
  letter-spacing: -1.3px;

  &:first-child {
    border-right: 1px solid ${gray};
  }
`;

const Warning = styled.div`
  font-size: 14px;
  text-align: center;
  color: ${grayBtnText};
  margin-left: 5px;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OKBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 0 0 5px 0;
`;

const NOBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${grayBtn};
  border-radius: 0 0 0 5px;
  color: ${blackBtn};
`;

export default VoteModal;
