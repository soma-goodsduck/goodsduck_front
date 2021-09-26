/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_LIKE_CNT = "SET_LIKE_CNT";
const SET_COMMENT_CNT = "SET_COMMENT_CNT";
const CLEAR_CNT = "CLEAR_CNT";
const SET_BCRYPT_FOR_REPORT = "SET_BCRYPT_FOR_REPORT";
const SET_COMMENT_ID = "SET_COMMENT_ID";
const CLEAR_INFO_FOR_REPORT = "CLEAR_INFO_FOR_REPORT";
const SET_COMMENT_NICK = "SET_COMMENT_NICK";
const CLEAR_COMMENT_INFO = "CLEAR_COMMENT_INFO";
const SET_IS_SECRET_COMMENT = "SET_IS_SECRET_COMMENT";
const SET_COMMENTS = "SET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const CLEAR_COMMENTS = "CLEAR_COMMENTS";

// action creators
const setLikeCnt = createAction(SET_LIKE_CNT, (likeCount) => ({ likeCount }));
const setCommentCnt = createAction(SET_COMMENT_CNT, (commentCount) => ({
  commentCount,
}));
const clearCnt = createAction(CLEAR_CNT, () => ({}));
const setBcryptForReport = createAction(
  SET_BCRYPT_FOR_REPORT,
  (bcryptForReport) => ({ bcryptForReport }),
);
const setCommentId = createAction(SET_COMMENT_ID, (commentId) => ({
  commentId,
}));
const clearInfoForReport = createAction(CLEAR_INFO_FOR_REPORT, () => ({}));
const setCommentNick = createAction(SET_COMMENT_NICK, (commentNick) => ({
  commentNick,
}));
const clearCommentInfo = createAction(CLEAR_COMMENT_INFO, () => ({}));
const setIsSecretComment = createAction(
  SET_IS_SECRET_COMMENT,
  (isSecretComment) => ({
    isSecretComment,
  }),
);
const setComments = createAction(SET_COMMENTS, (comments) => ({
  comments,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (idx) => ({
  idx,
}));
const clearComments = createAction(CLEAR_COMMENTS, () => ({}));

// initialState
const initialState = {
  likeCount: 0,
  commentCount: 0,
  bcryptForReport: "",
  commentId: 0,
  commentNick: "",
  isSecretComment: true,
  comments: [],
};

// middleware actions
const addCommentAction = (newComment, recommentId) => {
  return function (dispatch, getState, { history }) {
    if (recommentId === 0) {
      dispatch(addComment(newComment));
    } else {
      const idx = getState().post.comments.findIndex(
        (comment) => comment.commentId === recommentId,
      );

      const _comments = [...getState().post.comments];
      _comments.splice(idx + 1, 0, newComment);
      dispatch(setComments(_comments));
    }
  };
};

const deleteCommentAction = (commentId) => {
  return function (dispatch, getState, { history }) {
    const idx = getState().post.comments.findIndex(
      (comment) => comment.commentId === commentId,
    );

    const _comments = [...getState().post.comments];
    const _newComment = _comments[idx];
    const newComment = {
      commentId: _newComment.commentId,
      content: _newComment.content,
      createdAt: _newComment.createdAt,
      isLoginUserComment: _newComment.isLoginUserComment,
      isPostOwnerComment: _newComment.isPostOwnerComment,
      level: _newComment.level,
      isSecret: _newComment.isSecret,
      receiver: _newComment.receiver,
      writer: {
        bcryptId: _newComment.writer.bcryptId,
        imageUrl: _newComment.writer.imageUrl,
        level: _newComment.writer.level,
        nickName: _newComment.writer.nickName,
        userId: _newComment.writer.userId,
      },
    };

    // 만약 삭제하려는 댓글 아래 대댓글이 있다면 삭제하지 않고 내용만 제거
    const nextComment = _comments[idx + 1];
    if (
      nextComment !== undefined &&
      nextComment.level === 2 &&
      newComment.level === 1
    ) {
      newComment.content = "삭제된 댓글입니다.";
      _comments.splice(idx, 1, newComment);
      dispatch(setComments(_comments));
      return;
    }

    // 대댓글이 없다면 바로 삭제
    dispatch(deleteComment(idx));
  };
};

const updateToCommentStatusAction = (commentId, commentStatus) => {
  return function (dispatch, getState, { history }) {
    const idx = getState().post.comments.findIndex(
      (comment) => comment.commentId === commentId,
    );

    const _comments = [...getState().post.comments];
    const _newComment = _comments[idx];
    const newComment = {
      isSecret: commentStatus,
      commentId: _newComment.commentId,
      content: _newComment.content,
      createdAt: _newComment.createdAt,
      isLoginUserComment: _newComment.isLoginUserComment,
      isPostOwnerComment: _newComment.isPostOwnerComment,
      level: _newComment.level,
      receiver: _newComment.receiver,
      writer: {
        bcryptId: _newComment.writer.bcryptId,
        imageUrl: _newComment.writer.imageUrl,
        level: _newComment.writer.level,
        nickName: _newComment.writer.nickName,
        userId: _newComment.writer.userId,
      },
    };

    _comments.splice(idx, 1, newComment);
    dispatch(setComments(_comments));
  };
};

// reducer
export default handleActions(
  {
    [SET_LIKE_CNT]: (state, action) =>
      produce(state, (draft) => {
        draft.likeCount = action.payload.likeCount;
      }),
    [SET_COMMENT_CNT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentCount = action.payload.commentCount;
      }),
    [CLEAR_CNT]: (state, action) =>
      produce(state, (draft) => {
        draft.likeCount = 0;
        draft.commentCount = 0;
      }),
    [SET_BCRYPT_FOR_REPORT]: (state, action) =>
      produce(state, (draft) => {
        draft.bcryptForReport = action.payload.bcryptForReport;
      }),
    [SET_COMMENT_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.commentId = action.payload.commentId;
      }),
    [CLEAR_INFO_FOR_REPORT]: (state, action) =>
      produce(state, (draft) => {
        draft.bcryptForReport = "";
        draft.commentId = 0;
      }),
    [SET_COMMENT_NICK]: (state, action) =>
      produce(state, (draft) => {
        draft.commentNick = action.payload.commentNick;
      }),
    [CLEAR_COMMENT_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.commentNick = "";
        draft.commentId = 0;
      }),
    [SET_IS_SECRET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.isSecretComment = action.payload.isSecretComment;
      }),
    [SET_COMMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = action.payload.comments;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.push(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.splice(action.payload.idx, 1);
      }),
    [CLEAR_COMMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = [];
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setLikeCnt,
  setCommentCnt,
  clearCnt,
  setBcryptForReport,
  setCommentId,
  clearInfoForReport,
  setCommentNick,
  clearCommentInfo,
  setIsSecretComment,
  setComments,
  addCommentAction,
  deleteCommentAction,
  updateToCommentStatusAction,
  clearComments,
};

export { actionCreators };
