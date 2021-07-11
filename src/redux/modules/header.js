/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const CLICK_FILTERING = "CLICK_FILTERING";

// action creators
const clickFiltering = createAction(CLICK_FILTERING, (click_filtering) => ({
  click_filtering,
}));

// initialState
const initialState = {
  click_filtering: false,
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
        draft.click_filtering = !state.click_filtering;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  clickfilteringAction,
};

export { actionCreators };
