/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SAVE_IMG = "SAVE_IMG";
const ADD_IMG = "ADD_IMG";
const DELETE_IMG = "DELETE_IMG";
const SET_PREVIEW = "SET_PREVIEW";
const CLEAR_IMG = "CLEAR_IMG";
const HIDE_IMG_NOTICE = "HIDE_IMG_NOTICE";

// action creators
const saveImg = createAction(SAVE_IMG, (fileList) => ({
  fileList,
}));
const addImg = createAction(ADD_IMG, (img) => ({
  img,
}));
const deleteImg = createAction(DELETE_IMG, (imgName) => ({
  imgName,
}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const clearImg = createAction(CLEAR_IMG, () => ({}));
const hideImgNotice = createAction(HIDE_IMG_NOTICE, () => ({}));

// initialState
const initialState = {
  fileList: [],
  preview: null,
  isNotice: true,
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
    [SAVE_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.fileList = action.payload.fileList;
      }),
    [ADD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.fileList.push(action.payload.img);
      }),
    [DELETE_IMG]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.fileList.findIndex(
          (img) => img.name === action.payload.imgName,
        );
        draft.fileList.splice(idx, 1);
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
        draft.isNotice = true;
      }),
    [HIDE_IMG_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.isNotice = false;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  saveImg,
  addImg,
  deleteImg,
  setPreview,
  clearImgAction,
  hideImgNotice,
};

export { actionCreators };
