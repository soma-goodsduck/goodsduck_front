/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { requestAuthData } from "../../shared/axios";

// actions
const SET_POSTS = "SET_POSTS";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";
const CLEAR_POSTS = "CLEAR_POSTS";
const SET_COMMUNITY_MENU = "SET_COMMUNITY_MENU";

// action creators
const setPosts = createAction(SET_POSTS, (posts, hasNext, postNum) => ({
  posts,
  hasNext,
  postNum,
}));
const addpost = createAction(ADD_POST, (post) => ({
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const clearPosts = createAction(CLEAR_POSTS, () => ({}));
const setCommunityMenu = createAction(SET_COMMUNITY_MENU, (menu) => ({ menu }));

// initialState
const initialState = {
  posts: [],
  hasNext: true,
  isLoading: false,
  postNum: 0,
  menu: "home", // 커뮤니티 메뉴 타입
};

// middleware actions
// 전체 홈 데이터 OR 무료나눔장터
const getPostsData = (path, num) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().community.hasNext;

    if (num !== 0 && !_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getPostList = await requestAuthData(`v1/${path}?postId=${num}`);
    if (getPostList < 0) {
      if (getPostList === -201) {
        return;
      }
      history.push("/error");
      return;
    }

    const newPostData = getPostList.list;
    const hasNext = getPostList.hasNext;

    let postNum;
    if (newPostData.length !== 0) {
      postNum = newPostData[newPostData.length - 1].postId;
    }

    if (getPostList.hasNext) {
      dispatch(setPosts(newPostData, hasNext, postNum));
    } else {
      dispatch(setPosts(newPostData, hasNext, getState().community.postNum));
    }
  };
};

// 아이돌 그룹별 필터링 OR 무료나눔장터 + 아이돌 필터
const getPostsDataByIdol = (path, num, idolId) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().community.hasNext;

    if (num !== 0 && !_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getPostList = await requestAuthData(
      `v1/${path}/filter?postId=${num}&idolGroup=${idolId}`,
    );
    if (getPostList < 0) {
      if (getPostList === -201) {
        return;
      }
      history.push("/error");
      return;
    }

    const newPostData = getPostList.list;
    const hasNext = getPostList.hasNext;

    let postNum;
    if (newPostData.length !== 0) {
      postNum = newPostData[newPostData.length - 1].postId;
    }

    if (getPostList.hasNext) {
      dispatch(setPosts(newPostData, hasNext, postNum));
    } else {
      dispatch(setPosts(newPostData, hasNext, getState().community.postNum));
    }
  };
};

// 내가 작성한 포스트
const getMyPostsData = (num) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().community.hasNext;

    if (num !== 0 && !_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getPostList = await requestAuthData(`v1/users/posts?postId=${num}`);
    if (getPostList < 0) {
      if (getPostList === -201) {
        return;
      }
      history.push("/error");
      return;
    }

    const newPostData = getPostList.list;
    const hasNext = getPostList.hasNext;

    let postNum;
    if (newPostData.length !== 0) {
      postNum = newPostData[newPostData.length - 1].postId;
    }

    if (getPostList.hasNext) {
      dispatch(setPosts(newPostData, hasNext, postNum));
    } else {
      dispatch(setPosts(newPostData, hasNext, getState().community.postNum));
    }
  };
};

// 내가 작성한 댓글
const getMyCommentsData = (num) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().community.hasNext;

    if (num !== 0 && !_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getPostList = await requestAuthData(
      `v2/users/comments?postId=${num}`,
    );
    if (getPostList < 0) {
      if (getPostList === -201) {
        return;
      }
      history.push("/error");
      return;
    }

    const newPostData = getPostList.list;
    const hasNext = getPostList.hasNext;

    let postNum;
    if (newPostData.length !== 0) {
      postNum = newPostData[newPostData.length - 1].postId;
    }

    if (getPostList.hasNext) {
      dispatch(setPosts(newPostData, hasNext, postNum));
    } else {
      dispatch(setPosts(newPostData, hasNext, getState().community.postNum));
    }
  };
};

// 내가 좋아요한 포스트
const getMyFavoritePostsData = (num) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().community.hasNext;

    if (num !== 0 && !_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getPostList = await requestAuthData(
      `v1/users/like-posts?postId=${num}`,
    );
    if (getPostList < 0) {
      if (getPostList === -201) {
        return;
      }
      history.push("/error");
      return;
    }

    const newPostData = getPostList.list;
    const hasNext = getPostList.hasNext;

    let postNum;
    if (newPostData.length !== 0) {
      postNum = newPostData[newPostData.length - 1].postId;
    }

    if (getPostList.hasNext) {
      dispatch(setPosts(newPostData, hasNext, postNum));
    } else {
      dispatch(setPosts(newPostData, hasNext, getState().community.postNum));
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_POSTS]: (state, action) =>
      produce(state, (draft) => {
        draft.posts.push(...action.payload.posts);
        draft.hasNext = action.payload.hasNext;
        draft.postNum = action.payload.postNum;
        draft.isLoading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.posts.push(...action.payload.posts);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.posts.findIndex(
          (post) => post.id === action.payload.postId,
        );
        draft.posts.splice(idx, 1);
      }),
    [CLEAR_POSTS]: (state, action) =>
      produce(state, (draft) => {
        draft.posts = [];
        draft.hasNext = true;
        draft.isLoading = false;
        draft.postNum = 0;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [SET_COMMUNITY_MENU]: (state, action) =>
      produce(state, (draft) => {
        draft.menu = action.payload.menu;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  getPostsData,
  getPostsDataByIdol,
  getMyPostsData,
  getMyCommentsData,
  getMyFavoritePostsData,
  addpost,
  deletePost,
  clearPosts,
  setCommunityMenu,
};

export { actionCreators };
