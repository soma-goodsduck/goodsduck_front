/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import {
  getItems,
  getItemsByIdol,
  getItemsByFilter,
  getItemsBySearch,
} from "../../shared/axios";

// actions
const SET_HOME_ITEMS = "SET_HOME_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const LOADING = "LOADING";
const CLEAR_ITEMS = "CLEAR_ITEMS";

// action creators
const setHomeItems = createAction(
  SET_HOME_ITEMS,
  (items, hasNext, itemNum) => ({
    items,
    hasNext,
    itemNum,
  }),
);
const addItem = createAction(ADD_ITEM, (item) => ({
  item,
}));
const deleteItem = createAction(DELETE_ITEM, (itemId) => ({
  itemId,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const clearItems = createAction(CLEAR_ITEMS, () => ({}));

// initialState
const initialState = {
  items: [],
  hasNext: true,
  isLoading: false,
  itemNum: 0,
};

// middleware actions
// 전체 홈 데이터
const getItemsData = (_itemNum = 0) => {
  return function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = getItems("items", _itemNum);
    getItemList.then((result) => {
      const response = result.response;
      const newItemData = response.list;
      const hasNext = response.hasNext;
      const itemNum = newItemData[newItemData.length - 1].itemId;

      if (response.hasNext) {
        dispatch(setHomeItems(newItemData, hasNext, itemNum));
      } else {
        dispatch(setHomeItems(newItemData, hasNext, getState().home.itemNum));
      }
    });
  };
};

// 아이돌 그룹별 필터링
const getItemsDataByIdol = (num, idolId) => {
  return function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = getItemsByIdol(num, idolId);
    getItemList.then((result) => {
      const response = result.response;
      const newItemData = response.list;
      const hasNext = response.hasNext;

      let itemNum;
      if (newItemData.length !== 0) {
        itemNum = newItemData[newItemData.length - 1].itemId;
      }

      if (response.hasNext) {
        dispatch(setHomeItems(newItemData, hasNext, itemNum));
      } else {
        dispatch(setHomeItems(newItemData, hasNext, getState().home.itemNum));
      }
    });
  };
};

// 상세 필터링
const getItemsDataByFilter = (query) => {
  return function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = getItemsByFilter(query);
    getItemList.then((result) => {
      const response = result.response;
      const newItemData = response.list;
      const hasNext = response.hasNext;

      let itemNum;
      if (newItemData.length !== 0) {
        itemNum = newItemData[newItemData.length - 1].itemId;
      }

      if (response.hasNext) {
        dispatch(setHomeItems(newItemData, hasNext, itemNum));
      } else {
        dispatch(setHomeItems(newItemData, hasNext, getState().home.itemNum));
      }
    });
  };
};

// 검색 필터링
const getItemsDataBySearch = (num, _keyword) => {
  return function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = getItemsBySearch(num, _keyword);
    getItemList.then((result) => {
      const response = result.response;
      const newItemData = response.list;
      const hasNext = response.hasNext;

      let itemNum;
      if (newItemData.length !== 0) {
        itemNum = newItemData[newItemData.length - 1].itemId;
      }

      if (response.hasNext) {
        dispatch(setHomeItems(newItemData, hasNext, itemNum));
      } else {
        dispatch(setHomeItems(newItemData, hasNext, getState().home.itemNum));
      }
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_HOME_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.items.push(...action.payload.items);
        draft.hasNext = action.payload.hasNext;
        draft.itemNum = action.payload.itemNum;
        draft.isLoading = false;
      }),
    [ADD_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.items.push(...action.payload.items);
      }),
    [DELETE_ITEM]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.items.findIndex(
          (item) => item.id === action.payload.itemId,
        );
        draft.items.splice(idx, 1);
      }),
    [CLEAR_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.items = [];
        draft.hasNext = true;
        draft.isLoading = false;
        draft.itemNum = 0;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setHomeItems,
  addItem,
  deleteItem,
  clearItems,
  getItemsData,
  getItemsDataByIdol,
  getItemsDataByFilter,
  getItemsDataBySearch,
};

export { actionCreators };
