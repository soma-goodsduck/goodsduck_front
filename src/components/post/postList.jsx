import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "./post";
import InfinityScroll from "./infinityScroll";
import IdolGroupFiltering from "../filtering/idolGroupFiltering";

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
  const [isIdolFilter, setIsIdolFilter] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("filter_idolGroup")) {
      setIsIdolFilter(true);
    }
    dispatch(communityActions.clearPosts());

    // 커뮤니티
    if (type === "home") {
      if (isIdolFilter) {
        dispatch(
          communityActions.getPostsDataByIdol(
            0,
            localStorage.getItem("filter_idolGroup"),
          ),
        );
      } else {
        dispatch(communityActions.getPostsData("posts", 0));
      }
    } else if (type === "freeMarket") {
      // 무료나눔장터
      if (isIdolFilter) {
        dispatch(
          communityActions.getFreeMarketDataByIdol(
            0,
            localStorage.getItem("filter_idolGroup"),
          ),
        );
      } else {
        dispatch(communityActions.getPostsData("community/free-market", 0));
      }
    }
  }, []);

  const handleCallNext = (_type) => {
    // 커뮤니티
    if (type === "home") {
      if (_type === "home") {
        console.log(postNum);
        dispatch(communityActions.getPostsData("posts", postNum));
      } else if (_type === "idol") {
        dispatch(
          communityActions.getPostsDataByIdol(
            postNum,
            localStorage.getItem("filter_idolGroup"),
          ),
        );
      }
    } else if (type === "freeMarket") {
      // 무료나눔장터
      if (_type === "home") {
        dispatch(
          communityActions.getPostsData("community/free-market", postNum),
        );
      } else if (_type === "idol") {
        dispatch(
          communityActions.getFreeMarketDataByIdol(
            postNum,
            localStorage.getItem("filter_idolGroup"),
          ),
        );
      }
    }
  };

  const handleFiltering = async (id) => {
    // 커뮤니티
    dispatch(communityActions.clearPosts());
    dispatch(newPostActions.setIdol(id));
    if (type === "home") {
      if (id === 0) {
        onIdolFilter(0);
        setIsIdolFilter(false);
        dispatch(communityActions.getPostsData("posts", 0));
      } else {
        onIdolFilter(id);
        setIsIdolFilter(true);
        dispatch(communityActions.getPostsDataByIdol(0, id));
      }
    } else if (type === "freeMarket") {
      // 무료나눔장터
      if (id === 0) {
        onIdolFilter(0);
        setIsIdolFilter(false);
        dispatch(communityActions.getPostsData("community/free-market", 0));
      } else {
        onIdolFilter(id);
        setIsIdolFilter(true);
        dispatch(communityActions.getFreeMarketDataByIdol(0, id));
      }
    }
  };

  return (
    <>
      <IdolGroupFiltering onClick={handleFiltering} />
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
              <Post key={post.postId} postData={post} />
            ))}
          </>
        )}
      </InfinityScroll>
    </>
  );
};

export default PostList;
