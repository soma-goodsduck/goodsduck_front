/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SAVE_IMG = "SAVE_IMG";
const SET_PREVIEW = "SET_PREVIEW";
const CLEAR_IMG = "CLEAR_IMG";

// action creators
const saveImg = createAction(SAVE_IMG, (userId, fileList) => ({
  userId,
  fileList,
}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const clearImg = createAction(CLEAR_IMG, () => ({}));

// initialState
const initialState = {
  userId: null,
  fileList: [],
  preview: null,
};

// middleware actions
const clearImgAction = () => {
  return function (dispatch, getState, { history }) {
    dispatch(clearImg());
  };
};

const saveImgAction = (userId, fileList) => {
  return function (dispatch, getState, { history }) {
    console.log(userId, fileList);
    dispatch(saveImg(userId, fileList));
  };
};

// reducer
export default handleActions(
  {
    [SAVE_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userId;
        draft.fileList = action.payload.fileList;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [CLEAR_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.fileList = [];
        draft.preview = null;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  saveImgAction,
  setPreview,
  clearImgAction,
};

export { actionCreators };
