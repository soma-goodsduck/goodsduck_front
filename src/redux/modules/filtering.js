/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_ITEMS = "SET_ITEMS";
const CLICK_FILTERING = "CLICK_FILTERING";
const SET_FILTERING = "SET_FILTERING";
const SET_FILTER_IDOL_MEMBER = "SET_FILTER_IDOL_MEMBER";
const SET_FILTER_CATEGORY = "SET_FILTER_CATEGORY";
const SET_FILTER_STATUS = "SET_FILTER_STATUS";
const SET_FILTER_TRADE_TYPE = "SET_FILTER_TRADE_TYPE";
const SET_FILTER_PRICE_MIN = "SET_FILTER_PRICE_MIN";
const SET_FILTER_PRICE_MAX = "SET_FILTER_PRICE_MAX";
const CLEAR_FILTERING = "CLEAR_FILTERING";

// action creators
const setItems = createAction(SET_ITEMS, (items) => ({
  items,
}));
const clickFiltering = createAction(CLICK_FILTERING, (isFiltering) => ({
  isFiltering,
}));
const setFiltering = createAction(SET_FILTERING, (filtering) => ({
  filtering,
}));
const setFilterIdolMember = createAction(
  SET_FILTER_IDOL_MEMBER,
  (filterIdolMember, filterIdolMemberId) => ({
    filterIdolMember,
    filterIdolMemberId,
  }),
);
const setFilterCategory = createAction(
  SET_FILTER_CATEGORY,
  (filterCategory, filterCategoryId) => ({
    filterCategory,
    filterCategoryId,
  }),
);
const setFilterStatus = createAction(SET_FILTER_STATUS, (filterStatus) => ({
  filterStatus,
}));
const setFilterTradeType = createAction(
  SET_FILTER_TRADE_TYPE,
  (filterTradeType, filterTradeTypeKor) => ({
    filterTradeType,
    filterTradeTypeKor,
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
const clearFiltering = createAction(CLEAR_FILTERING, () => ({}));

// initialState
const initialState = {
  items: [],
  isFiltering: false,
  filtering: {},
  filterIdolMember: "",
  filterIdolMemberId: "",
  filterCategory: "",
  filterCategoryId: "",
  filterStatus: "",
  filterTradeType: "ALL",
  filterTradeTypeKor: "전체",
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
    [SET_FILTERING]: (state, action) =>
      produce(state, (draft) => {
        draft.filtering = action.payload.filtering;
      }),
    [SET_FILTER_IDOL_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.filterIdolMember = action.payload.filterIdolMember;
        draft.filterIdolMemberId = action.payload.filterIdolMemberId;
      }),
    [SET_FILTER_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.filterCategory = action.payload.filterCategory;
        draft.filterCategoryId = action.payload.filterCategoryId;
      }),
    [SET_FILTER_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.filterStatus = action.payload.filterStatus;
      }),
    [SET_FILTER_TRADE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.filterTradeType = action.payload.filterTradeType;
        draft.filterTradeTypeKor = action.payload.filterTradeTypeKor;
      }),
    [SET_FILTER_PRICE_MIN]: (state, action) =>
      produce(state, (draft) => {
        draft.filterPriceMin = action.payload.filterPriceMin;
      }),
    [SET_FILTER_PRICE_MAX]: (state, action) =>
      produce(state, (draft) => {
        draft.filterPriceMax = action.payload.filterPriceMax;
      }),
    [CLEAR_FILTERING]: (state, action) =>
      produce(state, (draft) => {
        draft.filtering = {};
        draft.filterIdolMember = "";
        draft.filterIdolMemberId = "";
        draft.filterCategory = "";
        draft.filterCategoryId = "";
        draft.filterStatus = "";
        draft.filterTradeType = "ALL";
        draft.filterPriceMin = 0;
        draft.filterPriceMax = 0;
        localStorage.removeItem("filtering");
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setItems,
  clickfilteringAction,
  setFiltering,
  setFilterIdolMember,
  setFilterCategory,
  setFilterStatus,
  setFilterTradeType,
  setFilterPriceMin,
  setFilterPriceMax,
  clearFiltering,
};

export { actionCreators };
