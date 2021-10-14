import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Flex, Text, Image, Icon } from "../../elements/index";
import {
  gray,
  grayBorder,
  grayBtn,
  darkGreen,
  red,
  white,
  blackNav,
} from "../../shared/colors";
import { formatDate } from "../../shared/functions";

import { history } from "../../redux/configureStore";

const Post = ({ postData, type }) => {
  const screen = window.screen.width;
  const [descHeight, setDescHegiht] = useState(0);
  useEffect(() => {
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

  return (
    <PostContainer>
      <PostBox
        onClick={() => {
          history.push(`/post/${postData.postId}`);
        }}
      >
        {/* 글쓴이 정보 */}
        <UserInfo>
          <Flex justify="space-between">
            <Flex>
              <Image
                shape="circle"
                src={
                  postData.postOwner.imageUrl ||
                  "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
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
                    src={`https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_level${postData.postOwner.level}.png`}
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
            <Flex is_col align="flex-end">
              {type !== "home" && type !== "freeMarket" && (
                <IdolBadge>{postData.idolGroupName}</IdolBadge>
              )}
              {postData.postCategory.postCategoryId === 26 && (
                <TypeBadge>나눔글</TypeBadge>
              )}
            </Flex>
          </Flex>
        </UserInfo>
        {/* 게시글 내용 */}
        <Body>
          <DescBox
            value={postData.content}
            readOnly
            style={{ height: `${30 + descHeight * 16}px` }}
          />
          {postData.images.length !== 0 && (
            <Flex margin="20px 0 0 0">
              <Image
                shape="normal"
                src={postData.images[0].url}
                width={screen >= 415 ? "375px" : "90vw"}
                borderRadius="10px"
              />
            </Flex>
          )}
        </Body>
        {/* 게시글 좋아요 & 댓글 */}
        <Nav>
          <LikeBtn>
            <Icon
              width="18px"
              src={
                postData.isLike
                  ? "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart_click.svg"
                  : "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart_empty.svg"
              }
              alt="likes item count"
              margin="0 5px 0 0"
            />
            <Text color={postData.isLike ? red : gray}>
              좋아요 {postData.likeCount}
            </Text>
          </LikeBtn>
          <CommentBtn>
            <Icon
              width="18px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_comment.svg"
              alt="likes item count"
              margin="0 5px 0 0"
            />

            <Text color={gray}>댓글 {postData.commentCount}</Text>
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

const TypeBadge = styled.div`
  color: ${darkGreen};
  width: 100%;
  border: 2px solid ${darkGreen};
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  padding: 3px 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const IdolBadge = styled.div`
  color: ${blackNav};
  width: 100%;
  border: 2px solid ${blackNav};
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
  padding: 3px 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  padding: 20px 0;
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

export default Post;
