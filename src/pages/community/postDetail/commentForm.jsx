import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import {
  blackBtn,
  grayBorder,
  lightGray2,
  white,
  yellow,
} from "../../../shared/colors";

import { postAction, requestAuthData } from "../../../shared/axios";
import { actionCreators as postActions } from "../../../redux/modules/post";
import { history } from "../../../redux/configureStore";

const CommentForm = ({ postId, isOwner }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSecretComment, setIsSecretComment] = useState(false);

  const { recommentId, recommentNick, commentCount } = useSelector((state) => ({
    recommentId: state.post.commentId,
    recommentNick: state.post.commentNick,
    commentCount: state.post.commentCount,
  }));

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const reqSendComment = async () => {
    const json = {
      content,
      isSecret: isSecretComment,
      receiveCommentId: recommentId,
      postId,
    };
    const result = await postAction("v3/comments", json);
    return result;
  };
  const handleSubmit = async () => {
    if (!content) {
      return;
    }

    setLoading(true);

    const _handleSubmit = await reqSendComment();
    const getUserData = await reqUserData();

    if (_handleSubmit < 0 || getUserData < 0) {
      history.push("/error");
      return;
    }

    setContent("");
    setLoading(false);
    dispatch(postActions.clearCommentInfo());

    let level = 1;
    let receiver = null;
    if (recommentId !== 0) {
      level = 2;
      receiver = { nickName: recommentNick, userId: recommentId };
    }

    const comment = {
      commentId: _handleSubmit.response,
      content,
      isSecret: isSecretComment,
      level,
      createdAt: new Date(),
      writer: {
        bcryptId: getUserData.bcryptId,
        imageUrl: getUserData.imageUrl,
        level: getUserData.level,
        nickName: getUserData.nickName,
      },
      isLoginUserComment: true,
      isPostOwnerComment: isOwner,
      receiver,
      childComments: [],
    };

    dispatch(postActions.addCommentAction(comment, recommentId));
    dispatch(postActions.setCommentCnt(commentCount + 1));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleExitRecommentBox = () => {
    dispatch(postActions.clearCommentInfo());
  };

  const handleSecretComment = () => {
    setIsSecretComment(!isSecretComment);
  };
  return (
    <>
      {recommentId !== 0 && recommentNick !== "" && (
        <RecommentBox>
          {recommentNick}????????? ?????? ????????? ???!
          <ExitBtn
            onClick={() => {
              handleExitRecommentBox();
            }}
          />
        </RecommentBox>
      )}
      <CommentFormBox>
        <LockBtn
          src={
            isSecretComment
              ? "https://goods-duck.com/icon/icon_lock1_yellow.png"
              : "https://goods-duck.com/icon/icon_lock2.png"
          }
          onClick={() => {
            handleSecretComment();
          }}
        />
        <InputBox
          placeholder="????????? ??????????????????."
          onKeyDown={handleKeyDown}
          value={content}
          onChange={handleChange}
        />
        <SendBtn
          type="submit"
          disabled={loading}
          onClick={() => {
            handleSubmit();
          }}
        >
          ??????
        </SendBtn>
      </CommentFormBox>
    </>
  );
};

const CommentFormBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${white};
  z-index: 3;

  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

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
const InputBox = styled.input`
  width: 87vw;
  height: 40px;
  border: 2px solid ${grayBorder};
  border-radius: 5px;
  margin: 0 12px;
  padding-left: 10px;
  padding-right: 55px;

  @media screen and (min-width: 415px) {
    width: 360px;
  }
`;

const SendBtn = styled.button`
  position: absolute;
  right: 5px;
  bottom: 15px;
  width: 50px;
  height: 30px;
  background-color: ${yellow};
  color: ${blackBtn};
  border-radius: 5px;
  margin: 0 12px;
  padding: 0 5px;
`;

const LockBtn = styled.button`
  position: absolute;
  left: 10px;
  bottom: 20px;
  width: 18px;
  height: 18px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;

const RecommentBox = styled.div`
  position: fixed;
  bottom: 50px;
  left: 0;

  width: 100%;
  height: 50px;
  background-color: ${lightGray2};
  padding: 10px;
  text-align: center;

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

const ExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 18px;
  height: 18px;
  background-image: url("https://goods-duck.com/icon/icon_delete.svg");
  background-size: cover;
  cursor: pointer;
`;

export default CommentForm;
