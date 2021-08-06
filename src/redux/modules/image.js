/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SAVE_IMG = "SAVE_IMG";
const SAVE_FILE_OBJECT = "SAVE_FILE_OBJECT";
const SET_PREVIEW = "SET_PREVIEW";
const CLEAR_IMG = "CLEAR_IMG";

// action creators
const saveImg = createAction(SAVE_IMG, (fileList) => ({
  fileList,
}));
const saveFileObject = createAction(SAVE_FILE_OBJECT, (fileObj) => ({
  fileObj,
}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const clearImg = createAction(CLEAR_IMG, () => ({}));

// initialState
const initialState = {
  fileList: [],
  fileObj: {},
  preview: null,
};

// middleware actions
const clearImgAction = () => {
  return function (dispatch, getState, { history }) {
    dispatch(clearImg());
  };
};

// reducer
export default handleActions(
  {
    [SAVE_FILE_OBJECT]: (state, action) =>
      produce(state, (draft) => {
        draft.fileObj = action.payload.fileObj;
      }),
    [SAVE_IMG]: (state, action) =>
      produce(state, (draft) => {
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
        draft.isImgAdded = false;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  saveImg,
  saveFileObject,
  setPreview,
  clearImgAction,
};

export { actionCreators };
