/* eslint-disable import/no-cycle */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Icon } from ".";
import { blackBtn, white, yellow } from "../shared/colors";

import { actionCreators as voteActions } from "../redux/modules/vote";

const VotePopUp = () => {
  const dispatch = useDispatch();
  const voteCount = useSelector((state) => state.vote.gettingVoteCount);

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Icon src="https://goods-duck.com/icon/goodsduck.png" width="50px" />
          <Text>투표권 {voteCount}개 획득</Text>
          <Btns>
            <OKBtn
              onClick={() => {
                dispatch(voteActions.setShowVotePopup(false));
              }}
            >
              확인
            </OKBtn>
          </Btns>
        </Info>
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

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ModalBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 40%;
`;

const Info = styled.div`
  position: relative;
  height: 230px;
  background-color: ${blackBtn};
  color: ${white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 15px 0;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

const OKBtn = styled.button`
  width: 80%;
  font-size: 16px;
  padding: 15px;
  margin: 0 auto;
  background-color: ${yellow};
  color: ${blackBtn};
  border-radius: 30px;
  font-weight: bold;
`;

export default VotePopUp;
