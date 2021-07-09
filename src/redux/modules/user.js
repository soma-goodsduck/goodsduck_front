import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setLS, deleteLS } from "../../shared/localStorage";

// actions
const SIGN_UP = "SIGN_UP";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators
const signUp = createAction(SIGN_UP, (id, type) => ({ id, type }));
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  id: null,
  type: null,
  is_login: false,
};

// middleware actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
    history.push("/home");
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
        `${process.env.REACT_APP_BACK_LOCALHOST_URL_K}/api/v1/signup`,
        JSON.stringify(json),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response.data.jwt);
        dispatch(logIn(response.data.jwt));
        history.push("/home");
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
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
        draft.type = action.payload.type;
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
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
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  loginAction,
  nonUserAction,
  signupAction,
};

export { actionCreators };
