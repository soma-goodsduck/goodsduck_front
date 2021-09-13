/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_PRICE_PROPOSE_LIST = "SET_PRICE_PROPOSE_LIST";
const ADD_PRICE_PROPOSE = "ADD_PRICE_PROPOSE";
const DELETE_PRICE_PROPOSE = "DELETE_PRICE_PROPOSE";
const SET_PRICE_PROPOSE_TYPE = "SET_PRICE_PROPOSE_TYPE";
const CLEAR_PRICE_PROPOSE_INFO = "CLEAR_PRICE_PROPOSE_INFO";

// action creators
const setPriceProposeList = createAction(
  SET_PRICE_PROPOSE_LIST,
  (priceProposeList) => ({
    priceProposeList,
  }),
);
const addPricePropose = createAction(ADD_PRICE_PROPOSE, (pricePropose) => ({
  pricePropose,
}));
const deletePricePropose = createAction(
  DELETE_PRICE_PROPOSE,
  (priceProposeId) => ({
    priceProposeId,
  }),
);
const setPriceProposeType = createAction(SET_PRICE_PROPOSE_TYPE, (type) => ({
  type,
}));
const clearPriceProposeInfo = createAction(
  CLEAR_PRICE_PROPOSE_INFO,
  () => ({}),
);

// initialState
const initialState = {
  priceProposeList: [],
  type: "", // SUGGEST OR DELETE
};

// middleware actions
const addPriceProposeAction = (pricePropose) => {
  return function (dispatch, getState, { history }) {
    dispatch(addPricePropose(pricePropose));
    dispatch(setPriceProposeType("DELETE"));
  };
};

const deletePriceProposeAction = (priceProposeId) => {
  return function (dispatch, getState, { history }) {
    dispatch(deletePricePropose(priceProposeId));
    dispatch(setPriceProposeType("SUGGEST"));
  };
};

// reducer
export default handleActions(
  {
    [SET_PRICE_PROPOSE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.priceProposeList = action.payload.priceProposeList;
      }),
    [ADD_PRICE_PROPOSE]: (state, action) =>
      produce(state, (draft) => {
        draft.priceProposeList.push(action.payload.pricePropose);
      }),
    [DELETE_PRICE_PROPOSE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.priceProposeList.findIndex(
          (pricePropose) =>
            pricePropose.priceProposeId === action.payload.priceProposeId,
        );
        draft.priceProposeList.splice(idx, 1);
      }),
    [SET_PRICE_PROPOSE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.type = action.payload.type;
      }),
    [CLEAR_PRICE_PROPOSE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.priceProposeList = [];
        draft.type = "";
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setPriceProposeList,
  setPriceProposeType,
  clearPriceProposeInfo,
  addPriceProposeAction,
  deletePriceProposeAction,
};

export { actionCreators };
