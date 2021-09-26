import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import PostHeader from "./postHeader";
import PostBody from "./postBody";
import Comments from "./comments";
import CommentForm from "./commentForm";

import { requestAuthData, deleteAction } from "../../../shared/axios";
import { actionCreators as newPostActions } from "../../../redux/modules/newPost";
import { actionCreators as postActions } from "../../../redux/modules/post";
import { actionCreators as commnunityActions } from "../../../redux/modules/community";
import { actionCreators as userActions } from "../../../redux/modules/user";

import { history } from "../../../redux/configureStore";

const postDetailPage = (props) => {
  const dispatch = useDispatch();

  const href = window.location.href.split("/");
  const postId = Number(href[href.length - 1]);
  const [postData, setPostData] = useState(null);

  const requestPostData = async () => {
    const result = await requestAuthData(`v1/posts/${postId}`);
    return result;
  };
  const fnEffect = async () => {
    const getPostDetail = await requestPostData();

    if (getPostDetail < 0) {
      if (getPostDetail === -101) {
        history.push("/no-item");
        return;
      }
      history.push("/error");
      return;
    }

    setPostData(getPostDetail);
    dispatch(postActions.setBcryptForReport(getPostDetail.postOwner.bcryptId));
  };
  useEffect(fnEffect, []);

  const handleEdit = () => {
    const imgUrls = [];
    postData.images.forEach((image) => {
      imgUrls.push(image.url);
    });

    const post = {
      postId: postData.postId,
      postType: postData.postCategory.postCategoryId,
      images: imgUrls,
      content: postData.content,
    };
    dispatch(newPostActions.setPostAction(post));
  };

  const reqDeletePost = async () => {
    const result = await deleteAction(`v1/posts/${postId}`);
    return result;
  };
  const handleDelete = async () => {
    const _handleDelete = await reqDeletePost();

    if (_handleDelete < 0) {
      window.alert("게시글 삭제에 실패했습니다.");
      return;
    }

    history.push("/community");
    dispatch(commnunityActions.deletePost(postId));
    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("게시글을 삭제했습니다."));
  };

  return (
    <>
      <PostHeader
        postData={postData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <PostBox>{postData && <PostBody postData={postData} />}</PostBox>
      <Comments postId={postId} />
      {postData && <CommentForm postId={postId} isOwner={postData.isOwner} />}
    </>
  );
};

const PostBox = styled.div`
  margin-top: 35px;
`;

export default postDetailPage;
