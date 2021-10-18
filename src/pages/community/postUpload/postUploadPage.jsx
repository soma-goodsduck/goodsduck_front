import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import styled from "styled-components";
import styles from "./postUpload.module.css";

import HeaderInfo from "../../../components/haeder/headerInfo";
import { DoubleCheckModal2, Flex, Spinner } from "../../../elements";
import PostImgUpload from "../../../components/postImgUpload/postImgUpload";

import { actionCreators as newPostActions } from "../../../redux/modules/newPost";
import { history } from "../../../redux/configureStore";

const postUploadPage = (props) => {
  const dispatch = useDispatch();
  const contentRef = useRef();
  const idolGroupName = localStorage.getItem("filter_idolGroupName");
  const [numOfLetters, setNumOfLetters] = useState(0);
  const [nextOK, setNextOK] = useState(false);

  const {
    _postType,
    _content,
    images,
    fileList,
    postId,
    isLoading,
    showImgBigPopup,
    showManyPostsPopup,
  } = useSelector((state) => ({
    _postType: state.newPost.postType,
    _content: state.newPost.content,
    images: state.newPost.images,
    fileList: state.image.fileList,
    postId: state.newPost.postId,
    isLoading: state.newItem.loading,
    showImgBigPopup: state.newPost.showImgBigPopup,
    showManyPostsPopup: state.newPost.showManyPostsPopup,
  }));

  const clickPostType = (e) => {
    if (e.target.innerText === "일반글") {
      dispatch(newPostActions.setPostType(25));
    } else if (e.target.innerText === "나눔글") {
      dispatch(newPostActions.setPostType(26));
    }
  };

  const post = {
    _postType,
    _content,
    images,
    fileList,
  };

  useEffect(() => {
    if (_postType && _content && numOfLetters > 4) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [_postType, _content, numOfLetters]);

  const uploadPost = () => {
    if (!nextOK) {
      return;
    }

    // 게시물 등록 또는 업데이트
    if (postId !== 0) {
      dispatch(newPostActions.updatePostAction(post, postId, fileList));
    } else {
      dispatch(newPostActions.addPostAction(post, fileList));
    }
  };

  // 글자수 더블체크
  const _checkLetters = _.debounce(async () => {
    setNumOfLetters(contentRef.current.value.split("").length);
  }, 300);
  const checkLetters = useCallback(_checkLetters, []);

  return (
    <>
      {isLoading && <Spinner />}
      {showImgBigPopup && (
        <DoubleCheckModal2
          text="이미지가 너무 커서 등록할 수 없습니다 :("
          height="80px"
          onOkClick={() => {
            dispatch(newPostActions.setShowImgBigPopup(false));
            history.replace("/community");
          }}
        />
      )}
      {showManyPostsPopup && (
        <DoubleCheckModal2
          text="단시간 내 너무 많은 글을 작성했습니다."
          text2="잠시 후 시도해주세요 :("
          height="80px"
          onOkClick={() => {
            dispatch(newPostActions.setShowManyPostsPopup(false));
            history.replace("/community");
          }}
        />
      )}

      {!isLoading && (
        <>
          <HeaderInfo text={idolGroupName} isCommunity />
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
                  placeholder="내용 (최소 글자 수 5자 이상)"
                  onChange={() => {
                    checkLetters(contentRef.current.value);
                    dispatch(
                      newPostActions.setContent(contentRef.current.value),
                    );
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
      )}
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
  height: 60%;
  min-height: 200px;
  resize: vertical;
  line-height: 1.5;

  @media screen and (min-width: 415px) {
    height: 100%;
  }
`;
const AddBtn = styled.button`
  margin-top: 10px;
`;

export default postUploadPage;
