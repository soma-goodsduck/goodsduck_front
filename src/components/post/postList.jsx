/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import Post from "./post";
import InfinityScroll from "./infinityScroll";
import IdolGroupFiltering from "../filtering/idolGroupFiltering";
import { pullToRefresh } from "../../shared/pullToRefresh";

import { actionCreators as communityActions } from "../../redux/modules/community";
import { actionCreators as newPostActions } from "../../redux/modules/newPost";

const PostList = ({ onIdolFilter, type }) => {
  const dispatch = useDispatch();
  const { posts, isLoading, hasNext, postNum } = useSelector((state) => ({
    posts: state.community.posts,
    isLoading: state.community.isLoading,
    hasNext: state.community.hasNext,
    postNum: state.community.postNum,
  }));
  const [isIdolFilter, setIsIdolFilter] = useState(
    localStorage.getItem("filter_idolGroup"),
  );

  // 모바일에서 위로 당기면 새로고침
  useEffect(() => {
    pullToRefresh();
  }, []);

  useEffect(() => {
    dispatch(communityActions.clearPosts());

    switch (type) {
      // 커뮤니티
      case "home":
        if (isIdolFilter) {
          dispatch(
            communityActions.getPostsDataByIdol(
              "posts",
              0,
              localStorage.getItem("filter_idolGroup"),
            ),
          );
        } else {
          dispatch(communityActions.getPostsData("posts", 0));
        }
        break;
      // 무료나눔장터
      case "freeMarket":
        if (isIdolFilter) {
          dispatch(
            communityActions.getPostsDataByIdol(
              "community/free-market",
              0,
              localStorage.getItem("filter_idolGroup"),
            ),
          );
        } else {
          dispatch(communityActions.getPostsData("community/free-market", 0));
        }
        break;
      // 내가 작성한 게시글
      case "myPosts":
        dispatch(communityActions.getMyPostsData(0));
        break;
      // 내가 작성한 댓글
      case "myComments":
        dispatch(communityActions.getMyCommentsData(0));
        break;
      // 내가 좋아요한 게시글
      case "myFavoritePosts":
        dispatch(communityActions.getMyFavoritePostsData(0));
        break;
      default:
        break;
    }
  }, []);

  const handleCallNext = (_type) => {
    switch (type) {
      // 커뮤니티
      case "home":
        if (_type === "home") {
          dispatch(communityActions.getPostsData("posts", postNum));
        } else if (_type === "idol") {
          dispatch(
            communityActions.getPostsDataByIdol(
              "posts",
              postNum,
              localStorage.getItem("filter_idolGroup"),
            ),
          );
        }
        break;
      // 무료나눔장터
      case "freeMarket":
        if (_type === "home") {
          dispatch(
            communityActions.getPostsData("community/free-market", postNum),
          );
        } else if (_type === "idol") {
          dispatch(
            communityActions.getPostsDataByIdol(
              "community/free-market",
              postNum,
              localStorage.getItem("filter_idolGroup"),
            ),
          );
        }
        break;
      // 내가 작성한 게시글
      case "myPosts":
        dispatch(communityActions.getMyPostsData(postNum));
        break;
      // 내가 작성한 댓글
      case "myComments":
        dispatch(communityActions.getMyCommentsData(postNum));
        break;
      // 내가 좋아요한 게시글
      case "myFavoritePosts":
        dispatch(communityActions.getMyFavoritePostsData(postNum));
        break;
      default:
        break;
    }
  };

  const handleFiltering = async (id) => {
    dispatch(communityActions.clearPosts());
    dispatch(newPostActions.setIdol(id));

    switch (type) {
      // 커뮤니티
      case "home":
        if (id === 0) {
          onIdolFilter(0);
          setIsIdolFilter(false);
          dispatch(communityActions.getPostsData("posts", 0));
        } else {
          onIdolFilter(id);
          setIsIdolFilter(true);
          dispatch(communityActions.getPostsDataByIdol("posts", 0, id));
        }
        break;
      // 무료나눔장터
      case "freeMarket":
        if (id === 0) {
          onIdolFilter(0);
          setIsIdolFilter(false);
          dispatch(communityActions.getPostsData("community/free-market", 0));
        } else {
          onIdolFilter(id);
          setIsIdolFilter(true);
          dispatch(
            communityActions.getPostsDataByIdol("community/free-market", 0, id),
          );
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {(type === "home" || type === "freeMarket") && (
        <IdolGroupFiltering onClick={handleFiltering} />
      )}

      {!isLoading && posts.length === 0 && (
        <Notice>
          <Text>아직 등록된 글이 없습니다😢</Text>
        </Notice>
      )}

      {type !== "home" && type !== "freeMarket" && <Box />}
      <InfinityScroll
        callNext={(_type) => {
          handleCallNext(_type);
        }}
        hasNext={hasNext}
        loading={isLoading}
        isIdolFilter={isIdolFilter}
      >
        {posts && (
          <>
            {posts.map((post) => (
              <Post key={post.postId} postData={post} type={type} />
            ))}
          </>
        )}
      </InfinityScroll>
    </>
  );
};

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const Text = styled.div`
  padding: 7px 0;
  font-weight: 500;
`;

const Box = styled.div`
  margin-top: 30px;
`;

export default PostList;
