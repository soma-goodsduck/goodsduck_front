/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const CLICK_FILTERING = "CLICK_FILTERING";

// action creators

const clickFiltering = createAction(CLICK_FILTERING, (isFiltering) => ({
  isFiltering,
}));

// initialState
const initialState = {
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
    [CLICK_FILTERING]: (state, action) =>
      produce(state, (draft) => {
        draft.isFiltering = !state.isFiltering;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  clickfilteringAction,
};

export { actionCreators };
