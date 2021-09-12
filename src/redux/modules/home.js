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
const SET_NEW_NOTI = "SET_NEW_NOTI";

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
const setNewNoti = createAction(SET_NEW_NOTI, (hasNewNoti) => ({
  hasNewNoti,
}));

// initialState
const initialState = {
  items: [],
  hasNext: true,
  isLoading: false,
  itemNum: 0,
  hasNewNoti: false,
};

// middleware actions
// 전체 홈 데이터
const getItemsData = (_itemNum = 0) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = await getItems("items", _itemNum);
    if (getItemList < 0) {
      history.push("/error");
      return;
    }

    const response = getItemList.response;
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

    dispatch(setNewNoti(response.noty.hasNewNotification));
  };
};

// 아이돌 그룹별 필터링
const getItemsDataByIdol = (num, idolId) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = await getItemsByIdol(num, idolId);
    if (getItemList < 0) {
      history.push("/error");
      return;
    }
    const response = getItemList.response;
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

    dispatch(setNewNoti(response.noty.hasNewNotification));
  };
};

// 상세 필터링
const getItemsDataByFilter = (query) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = await getItemsByFilter(query);
    if (getItemList < 0) {
      history.push("/error");
      return;
    }
    const response = getItemList.response;
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

    dispatch(setNewNoti(response.noty.hasNewNotification));
  };
};

// 검색 필터링
const getItemsDataBySearch = (num, _keyword) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = await getItemsBySearch(num, _keyword);
    if (getItemList < 0) {
      history.push("/error");
      return;
    }
    const response = getItemList.response;
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

    dispatch(setNewNoti(response.noty.hasNewNotification));
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
    [SET_NEW_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.hasNewNoti = action.payload.hasNewNoti;
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
