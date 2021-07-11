/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const GET_ITEM = "GET_ITEM";
const CLICK_HEART = "CLICK_HEART";

// action creators
const getItem = createAction(GET_ITEM, (id) => ({
  id,
}));
const clickHeart = createAction(CLICK_HEART, (is_like) => ({
  is_like,
}));

// initialState
const initialState = {
  id: null,
  status: "",
  type: "",
  title: "",
  img: null,
  price: null,
  user: "",
  user_img: null,
  time: null,
  is_like: false,
};

// middleware actions
const getItemAction = (item) => {
  return function (dispatch, getState, { history }) {
    dispatch(getItem(item));
  };
};

const clickHeartAction = (state) => {
  return function (dispatch, getState, { history }) {
    dispatch(clickHeart(state));
  };
};

// reducer
export default handleActions(
  {
    [GET_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
      }),
    [CLICK_HEART]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = !state.is_like;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  getItemAction,
  clickHeartAction,
};

export { actionCreators };
