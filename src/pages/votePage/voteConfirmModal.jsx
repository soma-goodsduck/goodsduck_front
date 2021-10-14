/* eslint-disable no-undef */
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Icon, Text, Button } from "../../elements";
import { blackBtn, white, grayBtnText, green } from "../../shared/colors";
import { actionCreators as voteActions } from "../../redux/modules/vote";

const VoteConfirmModal = () => {
  const dispatch = useDispatch();

  const { votedIdolName, votedCount } = useSelector((state) => ({
    votedIdolName: state.vote.votedIdolName,
    votedCount: state.vote.votedCount,
  }));

  // 공유하기
  const handleShareByKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "GOODSDUCK",
        description: "굿즈덕에서 투표하고 내 아이돌에게 광고 선물하자!",
        imageUrl:
          "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/image/event.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  const handleShareByTwitter = () => {
    const sendText = "GOODSDUCK";
    const sendUrl = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`,
    );
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Title>투표 완료</Title>
          <Flex is_flex>
            <Text>{votedIdolName}에게</Text>
            <Text bold color={green} margin="5px">
              {votedCount}표
            </Text>
            <Text> 투표하셨습니다.</Text>
          </Flex>
          <Text is_center>GOODSDUCK을 친구에게 공유해보세요!</Text>
          <Flex is_flex margin="20px 0 40px 0">
            <Button
              width="50px"
              height="50px"
              borderRadius="50%"
              margin="0 10px 0 0"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_kakao.svg"
              _onClick={() => {
                handleShareByKakao();
              }}
            />
            <Button
              width="50px"
              height="50px"
              borderRadius="50%"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_twitter.svg"
              _onClick={() => {
                handleShareByTwitter();
              }}
            />
          </Flex>
          <Flex is_col align="flex-start">
            <Flex is_flex>
              <Icon
                width="15px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_checkbox.svg"
              />
              <Notice>출석체크 투표권은 하루에 1개 지급됩니다.</Notice>
            </Flex>
            <Flex is_flex margin="5px 0">
              <Icon
                width="15px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_checkbox.svg"
              />
              <Notice>굿즈 등록시 투표권 2개가 지급됩니다.</Notice>
            </Flex>
            <Flex is_flex>
              <Icon
                width="15px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_checkbox.svg"
              />
              <Notice>커뮤니티 글 작성시 투표권 1개가 지급됩니다.</Notice>
            </Flex>
          </Flex>
        </Info>

        <ExitBtn
          onClick={() => {
            dispatch(voteActions.setShowConfirmModal(false));
            window.location.reload();
          }}
        >
          닫기
        </ExitBtn>
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
  margin-bottom: 20px;
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

const Notice = styled.div`
  font-size: 14px;
  text-align: center;
  color: ${grayBtnText};
  margin-left: 5px;
`;

const ExitBtn = styled.button`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 0 0 5px 5px;
`;

export default VoteConfirmModal;
