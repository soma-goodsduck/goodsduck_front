import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Text, Icon, PopUp2, PopUp3 } from "../../../elements/index";
import { white } from "../../../shared/colors";

import { actionCreators as postActions } from "../../../redux/modules/post";
import { history } from "../../../redux/configureStore";

const PostHeader = ({ postData, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const [showPopup1, setShowPopup1] = useState(false); // 옵션 1개
  const [showPopup2, setShowPopup2] = useState(false); // 옵션 2개

  const hidePopup1 = () => {
    setShowPopup1(false);
  };
  const hidePopup2 = () => {
    setShowPopup2(false);
  };

  const handleClick = () => {
    if (postData.isOwner) {
      setShowPopup2(true);
    } else {
      setShowPopup1(true);
    }
  };

  return (
    <>
      {showPopup1 && (
        <PopUp3
          text="신고하기"
          _onClick1={() => {
            history.push(`/report/posts/${postData.postId}`);
          }}
          _onClick2={() => {
            hidePopup1();
          }}
        />
      )}
      {showPopup2 && (
        <PopUp2
          text1="수정하기"
          text2="삭제하기"
          _onClick1={() => {
            onEdit();
          }}
          _onClick2={() => {
            onDelete();
            hidePopup2();
          }}
          _onClick3={() => hidePopup2()}
          isRed
        />
      )}
      <HeaderBox>
        <Flex is_flex padding="15px 0">
          <Column1>
            <Icon
              width="12px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_back_b.svg"
              _onClick={() => {
                history.push("/community");
                dispatch(postActions.clearCommentInfo());
                dispatch(postActions.clearComments());
                dispatch(postActions.clearInfoForReport());
              }}
            />
          </Column1>
          <Column2>
            <Text is_center size="18px">
              댓글쓰기
            </Text>
          </Column2>
          <Column3
            onClick={() => {
              handleClick();
            }}
          >
            <Icon
              width="12px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_hamburger.svg"
            />
          </Column3>
        </Flex>
      </HeaderBox>
    </>
  );
};

const HeaderBox = styled.div`
  width: 100%;
  padding: 0 20px;
  background-color: ${white};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  @media screen and (min-width: 415px) {
    width: 415px;
    left: 30%;
  }

  @media screen and (min-width: 500px) {
    left: 10%;
  }

  @media screen and (min-width: 850px) {
    left: 50%;
  }
`;

const Column1 = styled.div`
  float: left;
`;
const Column2 = styled.div`
  width: 100%;
  text-align: center;
`;
const Column3 = styled.div`
  float: right;
  width: 10px;
  text-align: right;
  cursor: pointer;
`;

export default PostHeader;
