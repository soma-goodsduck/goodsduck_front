/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import * as Sentry from "@sentry/react";

import { setLS, deleteLS } from "../../shared/localStorage";

// actions
const SIGN_UP = "SIGN_UP";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SHOW_POPUP = "SHOW_POPUP";
const NO_SHOW_POPUP = "NO_SHOW_POPUP";
const UPDATE_JWT = "UPDATE_JWT";

// action creators
const signUp = createAction(SIGN_UP, (id, type) => ({ id, type }));
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const showPopup = createAction(SHOW_POPUP, () => ({}));
const noShowPopup = createAction(NO_SHOW_POPUP, () => ({}));
const updateJwt = createAction(UPDATE_JWT, () => ({}));

// initialState
const initialState = {
  user: "",
  id: null,
  type: null,
  isLogin: false,
  showPopup: false,
};

// middleware actions

const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
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
    idols: user.idols,
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
        dispatch(logIn(response.data.jwt));
        history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
        Sentry.captureException(error);
        history.replace("/login");
      });
  };
};

const showPopupAction = () => {
  return function (dispatch, getState, { history }) {
    dispatch(showPopup());
  };
};

const noShowPopupAction = () => {
  return function (dispatch, getState, { history }) {
    dispatch(noShowPopup());
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
  },
  initialState,
);

// action creator export
const actionCreators = {
  logoutAction,
  getUser,
  loginAction,
  nonUserAction,
  signupAction,
  showPopupAction,
  noShowPopupAction,
  updateJwt,
};

export { actionCreators };
