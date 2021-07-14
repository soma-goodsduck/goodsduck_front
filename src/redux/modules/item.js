/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
const SET_ITEM = "SET_ITEM";
const ADD_ITEM = "ADD_ITEM";
const CLICK_HEART = "CLICK_HEART";

// action creators
const addItem = createAction(ADD_ITEM, (item) => ({ item }));
const setItem = createAction(SET_ITEM, (item_list) => ({ item_list }));
const clickHeart = createAction(CLICK_HEART, (is_like) => ({
  is_like,
}));

// initialState
const initialState = {
  list: [],
};

// 아이템(상세 페이지)에 필요한 정보
const initialItem = {
  //  판매자 정보
  user_info: {
    id: 0,
    user_name: "마크크크",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    user_level: 1,
  },
  //  아이템 정보
  name: "마크 포토카드 팔아요",
  description: "NCT 마크 맛 Hot Sauce 포카 팔아요",
  image_url: "https://pbs.twimg.com/media/D8JNRkpUwAACjz6.jpg",
  price: 20000,
  trade_type: "판매",
  trade_status: "A",
  idol_group_id: "NCT",
  idol_member_id: "마크",
  category_item_id: "포토카드",
  item_created_at: "2021-02-27 10:00:00",
  likes_item_count: 32,
  views_item_count: 119,
  is_like: false, // 유저가 해당 상품을 찜했는지 여부
};

// middleware actions
const addItemAction = (userId, fileList) => {
  const formData = new FormData();

  fileList.forEach((file) => {
    formData.append("multipartFiles", file);
  });

  const imgDto = {
    user: userId,
  };

  formData.append("stringImgDto", JSON.stringify(imgDto));

  axios.post(`${process.env.REACT_APP_BACK_URL}/api/v1/item/new/1`, formData);
};

const getItemAciton = () => {
  return function (dispatch, getState, { history }) {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/allItems`,
        );
        setItem(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };
};

const clickHeartAction = (state) => {
  return function (dispatch, getState, { history }) {
    dispatch(clickHeart(state));
  };
};

// reducer
export default handleActions(
  {
    [SET_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.item_list;
      }),
    [ADD_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
      }),
    [CLICK_HEART]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = !state.is_like;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  addItemAction,
  getItemAciton,
  clickHeartAction,
};

export { actionCreators };
