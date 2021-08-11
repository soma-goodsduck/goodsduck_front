/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_ITEMS = "SET_ITEMS";
const CLICK_FILTERING = "CLICK_FILTERING";
const SET_FILTER_TRADE_TYPE = "SET_FILTER_TRADE_TYPE";
const SET_FILTER_PRICE_MIN = "SET_FILTER_PRICE_MIN";
const SET_FILTER_PRICE_MAX = "SET_FILTER_PRICE_MAX";

// action creators
const setItems = createAction(SET_ITEMS, (items) => ({
  items,
}));
const clickFiltering = createAction(CLICK_FILTERING, (isFiltering) => ({
  isFiltering,
}));
const setFilterTradeType = createAction(
  SET_FILTER_TRADE_TYPE,
  (filterTradeType) => ({
    filterTradeType,
  }),
);
const setFilterPriceMin = createAction(
  SET_FILTER_PRICE_MIN,
  (filterPriceMin) => ({
    filterPriceMin,
  }),
);
const setFilterPriceMax = createAction(
  SET_FILTER_PRICE_MAX,
  (filterPriceMax) => ({
    filterPriceMax,
  }),
);

// initialState
const initialState = {
  items: [],
  isFiltering: false,
  filterTradeType: "all",
  filterPriceMin: 0,
  filterPriceMax: 0,
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
    [SET_FILTER_TRADE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.filterTradeType = action.payload.filterTradeType;
      }),
    [SET_FILTER_PRICE_MIN]: (state, action) =>
      produce(state, (draft) => {
        draft.filterPriceMin = action.payload.filterPriceMin;
      }),
    [SET_FILTER_PRICE_MAX]: (state, action) =>
      produce(state, (draft) => {
        draft.filterPriceMax = action.payload.filterPriceMax;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setItems,
  clickfilteringAction,
  setFilterTradeType,
  setFilterPriceMin,
  setFilterPriceMax,
};

export { actionCreators };
