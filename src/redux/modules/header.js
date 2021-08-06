/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_ITEMS = "SET_ITEMS";
const CLICK_FILTERING = "CLICK_FILTERING";

// action creators
const setItems = createAction(SET_ITEMS, (items) => ({
  items,
}));
const clickFiltering = createAction(CLICK_FILTERING, (isFiltering) => ({
  isFiltering,
}));

// initialState
const initialState = {
  items: [],
  isFiltering: false,
};

// middleware actions
const clickfilteringAction = (state) => {
  return function (dispatch, getState, { history }) {
    dispatch(clickFiltering(state));
  };
};

// reducer
export default handleActions(
  {
    [SET_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.items = action.payload.items;
      }),
    [CLICK_FILTERING]: (state, action) =>
      produce(state, (draft) => {
        draft.isFiltering = !state.isFiltering;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setItems,
  clickfilteringAction,
};

export { actionCreators };
