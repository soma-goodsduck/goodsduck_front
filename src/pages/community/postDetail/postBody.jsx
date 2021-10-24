import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { Flex, Text, Image, Icon } from "../../../elements/index";
import {
  gray,
  grayBorder,
  grayBtn,
  red,
  white,
  darkGreen,
} from "../../../shared/colors";
import { formatDate } from "../../../shared/functions";
import PostImg from "./postImg";

import { postAction } from "../../../shared/axios";
import { actionCreators as postActions } from "../../../redux/modules/post";
import { history } from "../../../redux/configureStore";

const PostBody = ({ postData }) => {
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(postData.isLike);
  const [userPushUrl, setUserPushUrl] = useState("/my-profile");
  const [descHeight, setDescHegiht] = useState(0);

  const { likeCount, commentCount } = useSelector((state) => ({
    likeCount: state.post.likeCount,
    commentCount: state.post.commentCount,
  }));

  useEffect(() => {
    if (!postData.isOwner) {
      setUserPushUrl(`/profile/${postData.postOwner.bcryptId}`);
    }

    dispatch(postActions.setLikeCnt(postData.likeCount));
    dispatch(postActions.setCommentCnt(postData.commentCount));

    const findEnter = postData.content.match(/[\n]/g);
    if (findEnter) {
      let _descHeingt = 0;
      const _desc = postData.content.split("\n");
      const numOfEnter = findEnter.length;

      for (let i = 0; i < numOfEnter + 1; i += 1) {
        if (_desc[i].length / 20 > 1) {
          _descHeingt += Math.ceil(_desc[i].length / 20);
        }
      }

      _descHeingt += numOfEnter;
      setDescHegiht(_descHeingt);
    } else {
      const countOfLetter = postData.content.length;
      if (countOfLetter / 20 > 1) {
        setDescHegiht(Math.floor(countOfLetter / 20));
      }
    }
  }, []);

  const reqLikePost = async () => {
    const result = await postAction(`v1/posts/${postData.postId}/like`);
    return result;
  };
  const reqDisikePost = async () => {
    const result = await postAction(`v1/posts/${postData.postId}/dislike`);
    return result;
  };
  const handleLikePost = async () => {
    if (isLike) {
      const _handleDislikePost = await reqDisikePost();
      if (_handleDislikePost < 0) {
        history.push("/error");
        return;
      }
      setIsLike(false);
      const _likeCount = likeCount - 1;
      dispatch(postActions.setLikeCnt(_likeCount));
    } else {
      const _handleLikePost = await reqLikePost();
      if (_handleLikePost < 0) {
        history.push("/error");
        return;
      }
      setIsLike(true);
      const _likeCount = likeCount + 1;
      dispatch(postActions.setLikeCnt(_likeCount));
    }
  };

  return (
    <PostContainer>
      <PostBox>
        {/* 글쓴이 정보 */}
        <UserInfo
          onClick={() => {
            history.push(`${userPushUrl}`);
          }}
        >
          <Flex justify="space-between">
            <Flex>
              <Image
                shape="circle"
                src={
                  postData.postOwner.imageUrl ||
                  "https://goods-duck.com/sample_goodsduck.png"
                }
                margin="0 10px 0 0"
                size="50px"
              />
              <Flex is_col align="flex-start">
                <Flex align="flex-end" margin="0 0 3px 0">
                  <Image
                    shape="circle"
                    size="18px"
                    margin="0 5px 0 0"
                    src={`https://goods-duck.com/icon/icon_level${postData.postOwner.level}.png`}
                  />
                  <UserName>
                    <Text size="16px">{postData.postOwner.nickName}</Text>
                  </UserName>
                </Flex>
                <Text size="14px" color={gray}>
                  {formatDate(postData.postCreatedAt)}
                </Text>
              </Flex>
            </Flex>
            {postData.postCategory.postCategoryId === 26 && (
              <TypeBadge>나눔글</TypeBadge>
            )}
          </Flex>
        </UserInfo>
        {/* 게시글 내용 */}
        <Body>
          <DescBox
            value={postData.content}
            readOnly
            style={{ height: `${30 + descHeight * 30}px` }}
          />
          {postData.images.length !== 0 && (
            <Flex margin="20px 0 0 0">
              <PostImg images={postData.images} />
            </Flex>
          )}
        </Body>
        {/* 게시글 좋아요 & 댓글 */}
        <Nav>
          <LikeBtn
            onClick={() => {
              handleLikePost();
            }}
          >
            <Icon
              width="18px"
              src={
                isLike
                  ? "https://goods-duck.com/icon/icon_heart_click.svg"
                  : "https://goods-duck.com/icon/icon_heart_empty.svg"
              }
              alt="likes item count"
              margin="0 5px 0 0"
            />
            <Text color={isLike ? red : gray}>좋아요 {likeCount}</Text>
          </LikeBtn>
          <CommentBtn>
            <Icon
              width="18px"
              src="https://goods-duck.com/icon/icon_comment.svg"
              alt="likes item count"
              margin="0 5px 0 0"
            />

            <Text color={gray}>댓글 {commentCount}</Text>
          </CommentBtn>
        </Nav>
      </PostBox>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  padding-bottom: 10px;
  background-color: ${grayBtn};
  cursor: pointer;
`;
const PostBox = styled.div`
  padding: 20px;
  background-color: ${white};
`;

const UserInfo = styled.div`
  text-align: left;
  margin-top: 5px;
`;

const UserName = styled.div`
  text-align: left;
  margin-bottom: 2px;
  font-weight: 500;
`;

const Body = styled.div`
  padding: 20px 0;
`;

const TypeBadge = styled.div`
  color: ${darkGreen};
  width: 58px;
  height: 28px;
  border: 2px solid ${darkGreen};
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${grayBorder};
  padding-top: 20px;
`;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  margin-right: 25px;
`;
const CommentBtn = styled.button`
  display: flex;
  align-items: center;
`;

const DescBox = styled.textarea`
  width: 100%;
  resize: none;
  line-height: 1.5;
`;

export default PostBody;
