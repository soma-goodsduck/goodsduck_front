/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import * as Sentry from "@sentry/react";

import { notification } from "../../shared/notification";
import { setLS, deleteLS } from "../../shared/localStorage";

// actions
const SIGN_UP = "SIGN_UP";
const SET_IDOLS_FOR_SIGNUP = "SET_IDOLS_FOR_SIGNUP";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SHOW_POPUP = "SHOW_POPUP";
const NO_SHOW_POPUP = "NO_SHOW_POPUP";
const UPDATE_JWT = "UPDATE_JWT";
const SET_FAV_IDOL_GROUPS = "SET_FAV_IDOL_GROUPS";
const SET_FILTERING_TYPE = "SET_FILTERING_TYPE";
const SET_USER_FOR_REVIEW = "SET_USER_FOR_REVIEW";
const SET_REVIEW = "SET_REVIEW";
const SET_NUM_OF_STAR = "SET_NUM_OF_STAR";
const CLEAR_REVIEW = "CLEAR_REVIEW";

// action creators
const signUp = createAction(SIGN_UP, (id, type) => ({ id, type }));
const setIdolsForSignup = createAction(
  SET_IDOLS_FOR_SIGNUP,
  (idolsForSignup) => ({
    idolsForSignup,
  }),
);
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const showPopup = createAction(SHOW_POPUP, () => ({}));
const noShowPopup = createAction(NO_SHOW_POPUP, () => ({}));
const updateJwt = createAction(UPDATE_JWT, () => ({}));
const setFavIdolGroups = createAction(SET_FAV_IDOL_GROUPS, (favIdolGroups) => ({
  favIdolGroups,
}));
const setFilteringType = createAction(SET_FILTERING_TYPE, (filteringType) => ({
  filteringType,
}));
const setUserForReview = createAction(SET_USER_FOR_REVIEW, (userForReview) => ({
  userForReview,
}));
const setReview = createAction(SET_REVIEW, (review) => ({
  review,
}));
const setNumOfStar = createAction(SET_NUM_OF_STAR, (numOfStar) => ({
  numOfStar,
}));
const clearReview = createAction(CLEAR_REVIEW, () => ({}));

// initialState
const initialState = {
  user: "",
  id: null,
  type: null,
  idolsForSignup: 0,
  isLogin: false,
  showPopup: false,
  favIdolGroups: [],
  filteringType: "SELLING",
  userForReview: "",
  review: "",
  numOfStar: 0,
};

// middleware actions

const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
    notification();
    history.replace("/");
  };
};

const logoutAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut(user));
    history.replace("/");
  };
};

// 비회원인 경우, 회원가입 페이지로 이동
const nonUserAction = (id, type) => {
  return function (dispatch, getState, { history }) {
    dispatch(signUp(id, type));
    history.push("/signup");
  };
};

// 최종 회원가입
const signupAction = (user) => {
  const json = {
    email: user.email,
    nickName: user.nick,
    phoneNumber: user.phone,
    socialAccountId: user.id,
    socialAccountType: user.type,
    likeIdolGroupsId: user.idols,
  };
  return function (dispatch, getState, { history }) {
    axios
      .post(
        `${process.env.REACT_APP_BACK_URL}/api/v1/users/sign-up`,
        JSON.stringify(json),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true },
      )
      .then((response) => {
        dispatch(logIn(response.data.response.jwt));
        notification();
        history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
        Sentry.captureException(error);
        history.replace("/login");
        window.alert("회원가입에 실패했습니다.");
      });
  };
};

// reducer
export default handleActions(
  {
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
        draft.type = action.payload.type;
        draft.isLogin = true;
        draft.show_popup = false;
      }),
    [SET_IDOLS_FOR_SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.idolsForSignup = action.payload.idolsForSignup;
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
        draft.show_popup = false;
        setLS("jwt", draft.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteLS("jwt");
        deleteLS("likeIdolGroups");
        deleteLS("filtering");
        deleteLS("filter_idolGroup");
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [SHOW_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.showPopup = true;
      }),
    [NO_SHOW_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.showPopup = false;
      }),
    [UPDATE_JWT]: (state, action) =>
      produce(state, (draft) => {
        setLS("jwt", draft.user);
      }),
    [SET_FAV_IDOL_GROUPS]: (state, action) =>
      produce(state, (draft) => {
        draft.favIdolGroups = action.payload.favIdolGroups;
      }),
    [SET_FILTERING_TYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.filteringType = action.payload.filteringType;
      }),
    [SET_USER_FOR_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.userForReview = action.payload.userForReview;
      }),
    [SET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review = action.payload.review;
      }),
    [SET_NUM_OF_STAR]: (state, action) =>
      produce(state, (draft) => {
        draft.numOfStar = action.payload.numOfStar;
      }),
    [CLEAR_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.userForReview = "";
        draft.numOfStar = 0;
        draft.review = "";
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  signupAction,
  setIdolsForSignup,
  loginAction,
  logoutAction,
  getUser,
  nonUserAction,
  showPopup,
  noShowPopup,
  updateJwt,
  setFavIdolGroups,
  setFilteringType,
  setUserForReview,
  setReview,
  setNumOfStar,
  clearReview,
};

export { actionCreators };
