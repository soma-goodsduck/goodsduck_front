/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { postImgAction, putAction } from "../../shared/axios";

// actions
const SET_POST = "SET_POST";
const SET_POST_TYPE = "SET_POST_TYPE";
const SET_CONTENT = "SET_CONTENT";
const SET_IDOL = "SET_IDOL";
const SET_FILES = "SET_FILES";
const SET_IMAGES = "SET_IMAGES";
const DELETE_IMAGE = "DELETE_IMAGE";
const CLEAR = "CLEAR";

// action creators
const setPost = createAction(SET_POST, (post) => ({ post }));
const setPostType = createAction(SET_POST_TYPE, (postType) => ({
  postType,
}));
const setContent = createAction(SET_CONTENT, (content) => ({ content }));
const setIdol = createAction(SET_IDOL, (idolId) => ({ idolId }));
const setFiles = createAction(SET_FILES, (files) => ({ files }));
const setImages = createAction(SET_IMAGES, (images) => ({ images }));
const deleteImage = createAction(DELETE_IMAGE, (image) => ({ image }));
const clear = createAction(CLEAR, () => ({}));

// initialState
const initialState = {
  postId: 0,
  idolId: 0,
  postType: 0,
  content: "",
  images: [], // image url
  files: [], // image file data
};

// middleware actions

// 게시글 정보를 백으로 전송
const addPostAction = (post, fileList) => {
  return async function (dispatch, getState, { history }) {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("multipartFiles", file);
    });
    const postDto = {
      postCategoryId: post._postType,
      content: post._content,
      idolGroupId: post.idolId,
    };
    formData.append("stringPostDto", JSON.stringify(postDto));

    const uploadItem = await postImgAction("v1/posts", formData);
    console.log(uploadItem);

    if (uploadItem < 0) {
      history.push("/error");
      return;
    }

    if (uploadItem !== -1) {
      console.log("게시글 등록 완료");
      history.replace(`/post/${uploadItem}`);
    } else {
      window.alert("게시글 등록 실패");
      history.push("/community");
    }
  };
};

// 등록한 아이템을 수정하기 위해 기존 정보를 세팅
const setPostAction = (post) => {
  return function (dispatch, getState, { history }) {
    console.log(post);
    dispatch(setPost(post));
    history.push("/upload-post");
  };
};

// 업데이트
const updatePostAction = (post, id, fileList) => {
  return async function (dispatch, getState, { history }) {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("multipartFiles", file);
    });

    const postDto = {
      postCategoryId: post._postType,
      content: post._content,
      imageUrls: post.images,
    };
    formData.append("stringPostDto", JSON.stringify(postDto));

    const updatePost = await putAction(`v1/posts/${id}`, formData);

    if (updatePost < 0) {
      history.push("/error");
      return;
    }

    if (updatePost.response !== -1) {
      console.log("게시글 수정 완료");
      history.replace(`/post/${updatePost.response}`);
    } else {
      window.alert("게시글 수정 실패");
      history.push("/community");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postId = action.payload.post.postId;
        draft.postType = action.payload.post.postType;
        draft.images = action.payload.post.images;
        draft.content = action.payload.post.content;
      }),
    [SET_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content = action.payload.content;
      }),
    [SET_IDOL]: (state, action) =>
      produce(state, (draft) => {
        draft.idolId = action.payload.idolId;
      }),
    [SET_POST_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.postType = action.payload.postType;
      }),
    [SET_IMAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.images = action.payload.images;
      }),
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.images = draft.images.filter(
          (imgUrl) => imgUrl !== action.payload.image,
        );
      }),
    [SET_FILES]: (state, action) =>
      produce(state, (draft) => {
        draft.files = action.payload.files;
      }),
    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        draft.postId = 0;
        draft.idolId = 0;
        draft.content = "";
        draft.postType = "";
        draft.files = [];
        draft.images = [];
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setPostAction,
  addPostAction,
  setPostType,
  setContent,
  setIdol,
  setFiles,
  setImages,
  deleteImage,
  clear,
  updatePostAction,
};

export { actionCreators };
