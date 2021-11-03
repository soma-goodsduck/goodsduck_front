import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Flex, Text, Image, Icon } from "../../../elements/index";
import { gray, grayBtnText, red, white } from "../../../shared/colors";
import { formatDate } from "../../../shared/functions";

import { actionCreators as postActions } from "../../../redux/modules/post";
import { history } from "../../../redux/configureStore";

const Comment = ({ comment, onClick }) => {
  const dispatch = useDispatch();
  const isPostOwnerComment = comment.isPostOwnerComment;
  const [userPushUrl, setUserPushUrl] = useState("/my-profile");
  const [isRecomment, setIsRecomment] = useState(false); // 대댓글인지 체크

  const styles = { isRecomment };

  useEffect(() => {
    if (!comment.isLoginUserComment) {
      setUserPushUrl(`/profile/${comment.writer.bcryptId}`);
    }

    if (comment.level === 2) {
      setIsRecomment(true);
    }
  }, []);

  const selectComment = () => {
    dispatch(postActions.setCommentId(comment.commentId));
    dispatch(postActions.setCommentNick(comment.writer.nickName));
  };
  const clickDots = () => {
    onClick(comment.isLoginUserComment);
    dispatch(postActions.setBcryptForReport(comment.writer.bcryptId));
    dispatch(postActions.setCommentId(comment.commentId));
    dispatch(postActions.setIsSecretComment(comment.isSecret));
  };

  return (
    <>
      <CommentBox {...styles}>
        <Flex justify="space-between" align="flex-start">
          <Flex align="flex-start">
            <Image
              shape="circle"
              src={
                comment.writer.imageUrl ||
                "https://goods-duck.com/sample_goodsduck.png"
              }
              margin="0 10px 0 0"
              size="50px"
            />
            <Flex is_col align="flex-start">
              <Flex
                align="flex-end"
                margin="0 0 3px 0"
                _onClick={() => {
                  history.push(`${userPushUrl}`);
                }}
              >
                <Image
                  shape="circle"
                  size="18px"
                  margin="0 5px 0 0"
                  src={`https://goods-duck.com/icon/icon_level${comment.writer.level}.png`}
                />
                <UserName>
                  <Text size="16px">{comment.writer.nickName}</Text>
                </UserName>
                {isPostOwnerComment && <PostOwnerBadge>작성자</PostOwnerBadge>}
              </Flex>
              <ContentBox {...styles}>
                {comment.isSecret && <LockBtn />}
                <Body {...styles}>
                  {comment.receiver !== null && (
                    <Text medium margin="0 5px 3px 0">
                      @{comment.receiver.nickName}
                    </Text>
                  )}
                  {comment.content}
                </Body>
              </ContentBox>
              <Flex>
                <Text size="14px" color={gray} margin="0 15px 0 0">
                  {formatDate(comment.createdAt)}
                </Text>
                {comment.content !== "삭제된 댓글입니다." && (
                  <TextBtn
                    onClick={() => {
                      selectComment();
                    }}
                  >
                    댓글
                  </TextBtn>
                )}
              </Flex>
            </Flex>
          </Flex>
          {comment.content !== "삭제된 댓글입니다." && (
            <Icon
              width="10px"
              src="https://goods-duck.com/icon/icon_hamburger_gray.svg"
              _onClick={() => {
                clickDots();
              }}
            />
          )}
        </Flex>
      </CommentBox>
    </>
  );
};

const CommentBox = styled.div`
  padding: 20px;
  background-color: ${white};
  ${(props) => (props.isRecomment ? "margin-left: 50px;" : "")}
`;

const UserName = styled.div`
  text-align: left;
  margin-bottom: 2px;
  font-weight: 500;
`;

const TextBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${grayBtnText};
`;

const PostOwnerBadge = styled.div`
  color: ${red};
  width: 52px;
  height: 22px;
  border: 2px solid ${red};
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  margin-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LockBtn = styled.button`
  width: 14px;
  height: 14px;
  margin-right: 5px;
  background-image: url("https://goods-duck.com/icon/icon_lock1.png");
  background-size: cover;
`;

const Body = styled.div`
  padding: 7px 0;
  ${(props) => (props.isRecomment ? "width: 50vw;" : "width: 70vw;")}

  @media screen and (min-width: 415px) {
    ${(props) => (props.isRecomment ? "width: 200px;" : "width: 300px;")}
  }
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;

  word-break: break-all;
  ${(props) => (props.isRecomment ? "width: 50vw;" : "width: 70vw;")}

  @media screen and (min-width: 415px) {
    ${(props) => (props.isRecomment ? "width: 200px;" : "width: 300px;")}
  }
`;

export default Comment;
