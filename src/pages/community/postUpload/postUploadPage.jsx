import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import styles from "./postUpload.module.css";

import HeaderInfo from "../../../components/haeder/headerInfo";
import { Flex } from "../../../elements";
import PostImgUpload from "../../../components/postImgUpload/postImgUpload";

import { actionCreators as newPostActions } from "../../../redux/modules/newPost";
import { actionCreators as imgActions } from "../../../redux/modules/image";
import { actionCreators as userActions } from "../../../redux/modules/user";

const postUploadPage = (props) => {
  const dispatch = useDispatch();
  const contentRef = useRef();
  const [nextOK, setNextOK] = useState(false);

  const { _postType, _content, images, fileList, postId, idolId } = useSelector(
    (state) => ({
      _postType: state.newPost.postType,
      _content: state.newPost.content,
      images: state.newPost.images,
      fileList: state.image.fileList,
      postId: state.newPost.postId,
      idolId: state.newPost.idolId,
    }),
  );

  const clickPostType = (e) => {
    if (e.target.innerText === "일반글") {
      dispatch(newPostActions.setPostType(25));
    } else if (e.target.innerText === "나눔글") {
      dispatch(newPostActions.setPostType(26));
    }
  };

  const post = {
    idolId,
    _postType,
    _content,
    images,
    fileList,
  };

  useEffect(() => {
    if (_postType && _content) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [_postType, _content]);

  const uploadPost = () => {
    if (!nextOK) {
      return;
    }

    // 게시물 등록 또는 업데이트
    if (postId !== 0) {
      dispatch(newPostActions.updatePostAction(post, postId, fileList));
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("게시글을 수정했습니다."));
    } else {
      dispatch(newPostActions.addPostAction(post, fileList));
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("게시글을 등록했습니다."));
    }

    // 저장된 상태값 모두 삭제
    dispatch(newPostActions.clear());
    dispatch(imgActions.clearImgAction());
  };

  return (
    <>
      <HeaderInfo text="작성하기" isCommunity />
      <PostUploadBox>
        <div>
          <Flex is_flex justify="flex-start">
            <PostImgUpload />
          </Flex>
          <Flex is_flex justify="space-between">
            <TypeBtn
              className={
                _postType === 25 ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickPostType(e)}
            >
              일반글
            </TypeBtn>
            <TypeBtn
              className={
                _postType === 26 ? styles.clickTypeBtn : styles.typeBtn
              }
              onClick={(e) => clickPostType(e)}
            >
              나눔글
            </TypeBtn>
          </Flex>
          <div className={styles.selectBtn}>
            <InputContentBox
              className={_content ? "" : styles.inputText}
              ref={contentRef}
              value={_content || ""}
              placeholder="내용"
              onChange={() => {
                dispatch(newPostActions.setContent(contentRef.current.value));
              }}
            />
          </div>
        </div>
        <AddBtn
          className={nextOK ? styles.nextOKBtn : styles.nextBtn}
          onClick={() => {
            uploadPost();
          }}
        >
          {postId !== 0 ? "수정 완료" : "작성 완료"}
        </AddBtn>
      </PostUploadBox>
    </>
  );
};

const PostUploadBox = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-top: 65px;

  @media screen and (min-width: 415px) {
    width: 415px;
    height: 93vh;
  }
`;

const TypeBtn = styled.button`
  width: 50%;
  padding: 15px;
`;

const InputContentBox = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 200px;
  resize: vertical;
`;
const AddBtn = styled.button`
  margin-top: 10px;
`;

export default postUploadPage;
