import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./votePage.module.css";

import { Flex, Text } from "../../elements";
import { lightGray2, blackBtn, orange, gray } from "../../shared/colors";
import { actionCreators as voteActions } from "../../redux/modules/vote";

const IdolForVote = ({ idol, ranking, onVote }) => {
  const dispatch = useDispatch();

  return (
    <>
      <IdolBox>
        <Flex>
          <IdolImg src={idol.imageUrl} />
          <VoteInfo>
            <Flex>
              <Text color={orange} bold margin="0 10px 0 20px">
                {ranking + 1}위
              </Text>
              <Text bold>{idol.name}</Text>
            </Flex>
            <GaugeBox>
              {idol.votedCount > 7 && (
                <Gauge style={{ width: `${idol.votedCount / 5 + 7}%` }} />
              )}
              {idol.votedCount <= 7 && idol.votedCount > 0 && (
                <Gauge style={{ width: "7%" }} />
              )}
              <GaugePercent>{idol.votedCount}표</GaugePercent>
            </GaugeBox>
          </VoteInfo>
        </Flex>
        <HeartBtn
          onClick={() => {
            onVote();
            dispatch(voteActions.setVotedIdolId(idol.id));
            dispatch(voteActions.setVotedIdolName(idol.name));
          }}
        >
          <button type="button" aria-label="vote" className={styles.likeBtn} />
          <Text size="14px" color={gray} margin="5px 0 0 0">
            투표
          </Text>
        </HeartBtn>
      </IdolBox>
    </>
  );
};

const IdolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 30px 20px;
`;

const IdolImg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 2;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
`;

const VoteInfo = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10px;

  left: 60px;
`;

const GaugeBox = styled.div`
  width: 55vw;
  height: 20px;
  border-radius: 10px;
  background: ${lightGray2};
  margin-top: 10px;
  position: relative;

  @media screen and (min-width: 415px) {
    width: 230px;
  }
`;

const Gauge = styled.div`
  max-width: 100%;
  height: 20px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(255, 226, 0, 1) 0%,
    rgba(255, 141, 41, 0.39113051470588234) 100%
  );
`;

const GaugePercent = styled.div`
  color: ${blackBtn};
  font-size: 0.7rem;
  padding-top: 2px;
  padding-right: 10px;
  position: absolute;
  top: 0;
  left: 45%;
`;

const HeartBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

export default IdolForVote;
