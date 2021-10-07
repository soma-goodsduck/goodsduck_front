/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { actionCreators as userActions } from "./user";
import { actionCreators as imgActions } from "./image";

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
const SET_FILES = "SET_FILES";
const SET_IMAGES = "SET_IMAGES";
const DELETE_IMAGE = "DELETE_IMAGE";
const CLEAR = "CLEAR";
const CLEAR_SELECT_IDOL = "CLEAR_SELECT_IDOL";
const SET_LOADING = "SET_LOADING";

// action creators
const setItem = createAction(SET_ITEM, (item) => ({ item }));
const setIdolGroup = createAction(
  SET_IDOL_GROUP,
  (idol_group_id, idol_group_name) => ({
    idol_group_id,
    idol_group_name,
  }),
);
const setIdolMember = createAction(
  SET_IDOL_MEMBER,
  (idol_member_id, idol_member_name) => ({
    idol_member_id,
    idol_member_name,
  }),
);
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
const setFiles = createAction(SET_FILES, (files) => ({ files }));
const setImages = createAction(SET_IMAGES, (images) => ({ images }));
const deleteImage = createAction(DELETE_IMAGE, (image) => ({ image }));
const clear = createAction(CLEAR, () => ({}));
const clearSelectIdol = createAction(CLEAR_SELECT_IDOL, () => ({}));
const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

// initialState
const initialState = {
  user_id: 0,
  item_id: 0,
  name: "",
  description: "",
  images: [], // image url
  files: [], // image file data
  price: null,
  trade_type: "",
  status_grade: "",
  idol_group_id: null,
  idol_member_id: null,
  idol_group_name: "",
  idol_member_name: "",
  category: "",
  loading: false,
};

// middleware actions

// 아이템 정보를 백으로 전송
const addItemAction = (item, fileList) => {
  return async function (dispatch, getState, { history }) {
    dispatch(setLoading(true));

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("multipartFiles", file);
    });
    const itemDto = {
      name: item.dataName,
      price: item.dataPrice,
      description: item.dataDesc,
      tradeType: item.dataTradeType,
      gradeStatus: item.dataStatus,
      category: item.dataCategory,
      idolMember: item.idolMember,
    };
    formData.append("stringItemDto", JSON.stringify(itemDto));

    const uploadItem = await axios.post(
      `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
      formData,
      {
        headers: { jwt: `${item.userJwt}` },
      },
    );

    dispatch(setLoading(false));
    dispatch(clear());
    dispatch(imgActions.clearImgAction());

    if (uploadItem < 0) {
      history.push("/error");
      return;
    }

    if (uploadItem.data.response !== -1) {
      history.replace(`/item/${uploadItem.data.response}`);
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("굿즈를 등록했습니다."));
    } else {
      window.alert("굿즈 등록 실패");
      history.push("/");
    }
  };
};

// 등록한 아이템을 수정하기 위해 기존 정보를 세팅
const setItemAction = (item) => {
  return function (dispatch, getState, { history }) {
    dispatch(setItem(item));
    history.push("/upload-item");
  };
};

// 저장된 상태값들 삭제
const clearAction = () => {
  return function (dispatch, getState, { history }) {
    dispatch(clear());
  };
};

// 업데이트
const updateItemAction = (item, id, fileList) => {
  return async function (dispatch, getState, { history }) {
    dispatch(setLoading(true));

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("multipartFiles", file);
    });

    const itemDto = {
      name: item.dataName,
      price: item.dataPrice,
      description: item.dataDesc,
      tradeType: item.dataTradeType,
      gradeStatus: item.dataStatus,
      category: item.dataCategory,
      idolMember: item.idolMember,
      imageUrls: item.images,
    };
    formData.append("stringItemDto", JSON.stringify(itemDto));

    const updateItem = await axios.put(
      `${process.env.REACT_APP_BACK_URL}/api/v2/items/${id}`,
      formData,
      {
        headers: { jwt: `${item.userJwt}` },
      },
    );

    dispatch(setLoading(false));
    dispatch(clear());
    dispatch(imgActions.clearImgAction());

    if (updateItem < 0) {
      history.push("/error");
      return;
    }

    if (updateItem.data.success) {
      history.replace(`/item/${id}`);
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("굿즈를 수정했습니다."));
    } else {
      window.alert("굿즈 수정 실패");
      history.push("/");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.item_id = action.payload.item.id;
        draft.images = action.payload.item.images;
        draft.idol_group_id = action.payload.item.groupId;
        draft.idol_group_name = action.payload.item.groupName;
        draft.idol_member_id = action.payload.item.memberId;
        draft.idol_member_name = action.payload.item.memberName;
        draft.name = action.payload.item.name;
        draft.price = action.payload.item.price;
        draft.description = action.payload.item.description;
        draft.trade_type = action.payload.item.tradeType;
        draft.status_grade = action.payload.item.gradeStatus;
        draft.category = action.payload.item.category;
      }),
    [SET_IDOL_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.idol_group_id = action.payload.idol_group_id;
        draft.idol_group_name = action.payload.idol_group_name;
      }),
    [SET_IDOL_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.idol_member_id = action.payload.idol_member_id;
        draft.idol_member_name = action.payload.idol_member_name;
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
    [SET_IMAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.images = action.payload.images;
      }),
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.images = draft.images.filter(
          (imgUrl) => imgUrl !== action.payload.image,
        );
      }),
    [SET_FILES]: (state, action) =>
      produce(state, (draft) => {
        draft.files = action.payload.files;
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
        draft.idol_member_id = null;
        draft.idol_group_name = "";
        draft.idol_member_name = "";
        draft.files = [];
        draft.images = [];
        draft.item_id = 0;
      }),
    [CLEAR_SELECT_IDOL]: (state, action) =>
      produce(state, (draft) => {
        draft.idol_group_id = null;
        draft.idol_member_id = null;
        draft.idol_group_name = "";
        draft.idol_member_name = "";
      }),
    [SET_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  setItemAction,
  addItemAction,
  setFiles,
  setIdolGroup,
  setIdolMember,
  setPrice,
  setName,
  setCategory,
  setDesc,
  setTradeType,
  setStatus,
  setImages,
  deleteImage,
  clearAction,
  clearSelectIdol,
  updateItemAction,
};

export { actionCreators };
