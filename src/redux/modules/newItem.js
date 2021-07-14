/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
const SET_ITEM = "SET_ITEM";
const SET_IDOL_GROUP = "SET_IDOL_GROUP";
const SET_IDOL_MEMBER = "SET_IDOL_MEMBER";
const SET_NAME = "SET_NAME";
const SET_PRICE = "SET_PRICE";
const SET_TRADE_TYPE = "SET_TRADE_TYPE";
const SET_CATEGORY = "SET_CATEGORY";
const SET_STATUS = "SET_STATUS";
const SET_DESC = "SET_DESC";
const CLEAR = "CLEAR";

// action creators
const setItem = createAction(SET_ITEM, (item) => ({ item }));
const setIdolGroup = createAction(SET_IDOL_GROUP, (idol_group_id) => ({
  idol_group_id,
}));
const setIdolMember = createAction(SET_IDOL_MEMBER, (idol_member_id) => ({
  idol_member_id,
}));
const setName = createAction(SET_NAME, (name) => ({ name }));
const setPrice = createAction(SET_PRICE, (price) => ({ price }));
const setTradeType = createAction(SET_TRADE_TYPE, (trade_type) => ({
  trade_type,
}));
const setCategory = createAction(SET_CATEGORY, (category) => ({ category }));
const setStatus = createAction(SET_STATUS, (status_grade) => ({
  status_grade,
}));
const setDesc = createAction(SET_DESC, (description) => ({ description }));
const clear = createAction(CLEAR, () => ({}));

// initialState
const initialState = {
  user_id: 0,
  item_id: null,
  name: "",
  description: "",
  image_url: "",
  price: null,
  trade_type: "",
  status_grade: "",
  idol_group_id: null,
  idol_member_id: null,
  category: "",
};

// 아이템 등록에 필요한 정보
const initialItem = {
  user_id: 0,
  name: "마크 포토카드 팔아요",
  description: "NCT 마크 맛 Hot Sauce 포카 팔아요",
  image_url: "https://pbs.twimg.com/media/D8JNRkpUwAACjz6.jpg",
  price: 20000,
  trade_type: "판매",
  status_grade: "A",
  idol_group_id: "NCT",
  idol_member_id: "마크",
  category: "포토카드",
};

// middleware actions
// 아이템 등록할 때 필요한 정보들을 저장
const setIdolAction = (idolGroup) => {
  return function (dispatch, getState, { history }) {
    dispatch(setIdolGroup(idolGroup));
  };
};

const setIdolMemberAction = (idolMember) => {
  return function (dispatch, getState, { history }) {
    dispatch(setIdolMember(idolMember));
  };
};

const setNameAction = (name) => {
  return function (dispatch, getState, { history }) {
    dispatch(setName(name));
  };
};

const setPriceAction = (price) => {
  return function (dispatch, getState, { history }) {
    dispatch(setPrice(price));
  };
};

const setTradeTypeAction = (tradeType) => {
  return function (dispatch, getState, { history }) {
    dispatch(setTradeType(tradeType));
  };
};

const setCategoryAction = (category) => {
  return function (dispatch, getState, { history }) {
    dispatch(setCategory(category));
  };
};

const setStatusAction = (status) => {
  return function (dispatch, getState, { history }) {
    dispatch(setStatus(status));
  };
};

const setDescAction = (desc) => {
  return function (dispatch, getState, { history }) {
    dispatch(setDesc(desc));
  };
};

const clearAction = () => {
  return function (dispatch, getState, { history }) {
    dispatch(clear());
  };
};

// 아이템 정보를 백으로 전송
const addItemAction = (item, fileList) => {
  return function (dispatch, getState, { history }) {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("multipartFiles", file);
    });
    const itemDto = {
      name: item.dataName,
      price: item.dataPrice,
      description: item.dataDesc,
      tradeType: item.dataTradeType,
      statusGrade: item.dataStatus,
      category: item.dataCategory,
      idolGroup: item.idolGroup,
      idolMember: item.idolMember,
    };
    formData.append("stringItemDto", JSON.stringify(itemDto));
    console.log(itemDto);

    axios
      .post(`${process.env.REACT_APP_BACK_URL}/api/v1/item/new`, formData, {
        headers: { jwt: `${item.userJwt}` },
      })
      .then((response) => {
        if (response.data === "OK") {
          console.log("굿즈 등록 완료");
          history.push("/home");
        } else {
          console.log("굿즈 등록 실패");
        }
      })
      .catch((error) => {
        console.log("error", error);
        history.replace("/");
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.item = action.payload.item;
      }),
    [SET_IDOL_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.idol_group_id = action.payload.idol_group_id;
      }),
    [SET_IDOL_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.idol_member_id = action.payload.idol_member_id;
      }),
    [SET_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.name = action.payload.name;
      }),
    [SET_PRICE]: (state, action) =>
      produce(state, (draft) => {
        draft.price = action.payload.price;
      }),
    [SET_DESC]: (state, action) =>
      produce(state, (draft) => {
        draft.description = action.payload.description;
      }),
    [SET_TRADE_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.trade_type = action.payload.trade_type;
      }),
    [SET_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.status_grade = action.payload.status_grade;
      }),
    [SET_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.category = action.payload.category;
      }),
    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        draft.name = "";
        draft.price = null;
        draft.description = "";
        draft.category = "";
        draft.trade_type = "";
        draft.status_grade = "";
        draft.idol_group_id = null;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  addItemAction,
  setIdolAction,
  setIdolMemberAction,
  setPriceAction,
  setNameAction,
  setCategoryAction,
  setDescAction,
  setTradeTypeAction,
  setStatusAction,
  clearAction,
};

export { actionCreators };
