/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable camelcase */

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

// action creators
const signUp = createAction(SIGN_UP, (id, type) => ({ id, type }));
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const showPopup = createAction(SHOW_POPUP, () => ({}));
const noShowPopup = createAction(NO_SHOW_POPUP, () => ({}));

// initialState
const initialState = {
  user: "",
  id: null,
  type: null,
  is_login: false,
  show_popup: false,
};

// middleware actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
    history.replace("/home");
  };
};

const loginCheckAction = () => {
  const jwt = localStorage.getItem("jwt");
  return function (dispatch, getState, { history }) {
    if (jwt !== null) {
      axios
        .get(`${process.env.REACT_APP_BACK_URL}/api/v1/validate/user`, {
          headers: { jwt: `${jwt}` },
        })
        .then(function (result) {
          if (result.data.role === "USER") {
            dispatch(loginAction(jwt));
          } else if (result.data.role === "ANONYMOUS") {
            console.log(result.data);
            dispatch(logOut());
          }
        })
        .catch((error) => {
          console.log("error", error);
          Sentry.captureException(error);
        });
    }
  };
};

const checkUserAction = (path) => {
  const jwt = localStorage.getItem("jwt");
  return function (dispatch, getState, { history }) {
    if (jwt == null) {
      dispatch(showPopup());
    } else {
      axios
        .get(`${process.env.REACT_APP_BACK_URL}/api/v1/validate/user`, {
          headers: { jwt: `${jwt}` },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.role === "ANONYMOUS") {
            dispatch(showPopup());
            localStorage.removeItem("jwt");
            window.location.reload(); // 새로고침
          } else {
            history.push(`/${path}`);
          }
        })
        .catch((error) => {
          console.log("error", error);
          Sentry.captureException(error);
        });
    }
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
  };
  console.log(json);
  return function (dispatch, getState, { history }) {
    axios
      .post(
        `${process.env.REACT_APP_BACK_URL}/api/v1/signup`,
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
        history.push("/home");
      })
      .catch((error) => {
        console.log("error", error);
        Sentry.captureException(error);
        history.replace("/");
      });
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
        draft.is_login = true;
        draft.show_popup = false;
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        draft.show_popup = false;
        setLS("jwt", draft.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteLS("jwt");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [SHOW_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.show_popup = true;
      }),
    [NO_SHOW_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.show_popup = false;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  loginAction,
  loginCheckAction,
  checkUserAction,
  nonUserAction,
  signupAction,
  noShowPopupAction,
};

export { actionCreators };
