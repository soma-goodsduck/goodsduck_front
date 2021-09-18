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
const SET_HOME_ITEMS_WITH_PRICE = "SET_HOME_ITEMS_WITH_PRICE";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const LOADING = "LOADING";
const CLEAR_ITEMS = "CLEAR_ITEMS";
const SET_NEW_NOTI = "SET_NEW_NOTI";
const SET_SEARCH_ORDER_TYPE = "SET_SEARCH_ORDER_TYPE";
const SET_SEARCH_COMPLETE_TYPE = "SET_SEARCH_COMPLETE_TYPE";

// action creators
const setHomeItems = createAction(
  SET_HOME_ITEMS,
  (items, hasNext, itemNum) => ({
    items,
    hasNext,
    itemNum,
  }),
);
const setHomeItemsWithPrice = createAction(
  SET_HOME_ITEMS_WITH_PRICE,
  (items, hasNext, itemNum, price) => ({
    items,
    hasNext,
    itemNum,
    price,
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
const setSearchOrderType = createAction(
  SET_SEARCH_ORDER_TYPE,
  (searchOrderType) => ({
    searchOrderType,
  }),
);
const setSearchCompleteType = createAction(
  SET_SEARCH_COMPLETE_TYPE,
  (searchCompleteType) => ({
    searchCompleteType,
  }),
);

// initialState
const initialState = {
  items: [],
  hasNext: true,
  isLoading: false,
  itemNum: 0,
  price: -1,
  hasNewNoti: false,
  searchOrderType: "latest",
  searchCompleteType: true,
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
const getItemsDataBySearch = (
  num,
  _keyword,
  orderType,
  completeType,
  _price,
) => {
  return async function (dispatch, getState, { history }) {
    const _hasNext = getState().home.hasNext;

    if (!_hasNext) {
      return;
    }

    dispatch(loading(true));

    const getItemList = await getItemsBySearch(
      num,
      _keyword,
      orderType,
      completeType,
      _price,
    );
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
    let price;
    if (newItemData.length !== 0) {
      price = newItemData[newItemData.length - 1].price;
    }

    if (response.hasNext) {
      dispatch(setHomeItemsWithPrice(newItemData, hasNext, itemNum, price));
    } else {
      dispatch(
        setHomeItemsWithPrice(
          newItemData,
          hasNext,
          getState().home.itemNum,
          getState().home.price,
        ),
      );
    }
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
    [SET_HOME_ITEMS_WITH_PRICE]: (state, action) =>
      produce(state, (draft) => {
        draft.items.push(...action.payload.items);
        draft.hasNext = action.payload.hasNext;
        draft.itemNum = action.payload.itemNum;
        draft.price = action.payload.price;
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
    [SET_SEARCH_ORDER_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.searchOrderType = action.payload.searchOrderType;
      }),
    [SET_SEARCH_COMPLETE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.searchCompleteType = action.payload.searchCompleteType;
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
  setSearchOrderType,
  setSearchCompleteType,
};

export { actionCreators };
