/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { postImgAction, putAction } from "../../shared/axios";
import { actionCreators as userActions } from "./user";
import { actionCreators as imgActions } from "./image";
import { actionCreators as voteActions } from "./vote";

// actions
const SET_POST = "SET_POST";
const SET_POST_TYPE = "SET_POST_TYPE";
const SET_CONTENT = "SET_CONTENT";
const SET_IDOL = "SET_IDOL";
const SET_FILES = "SET_FILES";
const SET_IMAGES = "SET_IMAGES";
const DELETE_IMAGE = "DELETE_IMAGE";
const CLEAR = "CLEAR";
const SET_LOADING = "SET_LOADING";
const SET_SHOW_IMG_BIG_POPUP = "SET_SHOW_IMG_BIG_POPUP";
const SET_SHOW_MANY_POSTS_POPUP = "SET_SHOW_MANY_POSTS_POPUP";

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
const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));
const setShowImgBigPopup = createAction(
  SET_SHOW_IMG_BIG_POPUP,
  (showImgBigPopup) => ({ showImgBigPopup }),
);
const setShowManyPostsPopup = createAction(
  SET_SHOW_MANY_POSTS_POPUP,
  (showManyPostsPopup) => ({ showManyPostsPopup }),
);

// initialState
const initialState = {
  postId: 0,
  idolId: 0,
  postType: 0,
  content: "",
  images: [], // image url
  files: [], // image file data
  loading: false,
  showImgBigPopup: false,
  showManyPostsPopup: false,
};

// middleware actions

// 게시글 정보를 백으로 전송
const addPostAction = (post, fileList) => {
  return async function (dispatch, getState, { history }) {
    dispatch(setLoading(true));

    let filesSize = 0;
    const formData = new FormData();
    fileList.forEach((file) => {
      filesSize += file.size;
      formData.append("multipartFiles", file);
    });

    if (filesSize > 10000000) {
      dispatch(setShowImgBigPopup(true));
      dispatch(setLoading(false));
      dispatch(clear());
      dispatch(imgActions.clearImgAction());
      return;
    }

    const postDto = {
      postCategoryId: post._postType,
      content: post._content,
      idolGroupId: localStorage.getItem("filter_idolGroup"),
    };
    formData.append("stringPostDto", JSON.stringify(postDto));

    const uploadItem = await postImgAction("v1/posts", formData);
    dispatch(setLoading(false));
    dispatch(clear());
    dispatch(imgActions.clearImgAction());

    if (uploadItem < 0) {
      // 단시간내에 글 많이 작성하면 -106
      if (uploadItem === -106) {
        dispatch(setShowManyPostsPopup(true));
        return;
      }
      history.push("/error");
      return;
    }

    history.replace(`/post/${uploadItem}`);
    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("게시글을 등록했습니다."));
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
    dispatch(setLoading(true));

    let filesSize = 0;
    const formData = new FormData();
    fileList.forEach((file) => {
      filesSize += file.size;
      formData.append("multipartFiles", file);
    });

    if (filesSize > 10000000) {
      dispatch(setShowImgBigPopup(true));
      dispatch(setLoading(false));
      dispatch(clear());
      dispatch(imgActions.clearImgAction());
      return;
    }

    const postDto = {
      postCategoryId: post._postType,
      content: post._content,
      imageUrls: post.images,
    };
    formData.append("stringPostDto", JSON.stringify(postDto));

    const updatePost = await putAction(`v1/posts/${id}`, formData);
    dispatch(setLoading(false));
    dispatch(clear());
    dispatch(imgActions.clearImgAction());

    if (updatePost < 0) {
      history.push("/error");
      return;
    }

    history.replace(`/post/${updatePost.response}`);
    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("게시글을 수정했습니다."));
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
    [SET_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
    [SET_SHOW_IMG_BIG_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.showImgBigPopup = action.payload.showImgBigPopup;
      }),
    [SET_SHOW_MANY_POSTS_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.showManyPostsPopup = action.payload.showManyPostsPopup;
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
  setShowImgBigPopup,
  setShowManyPostsPopup,
};

export { actionCreators };
