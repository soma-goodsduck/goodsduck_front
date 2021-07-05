import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setLS, deleteLS } from "../../shared/localStorage";

// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const signupAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
    history.push("/");
  };
};

const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    history.push("/signup");
  };
};

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_LOCALHOST_URL_K}/oauth/callback/kakao?code=${code}`,
    })
      .then(async (res) => {
        const ACCESS_TOKEN = res.data.accessToken;
        const REFRESH_TOKEN = res.data.refreshToken;

        await setLS("is_login", REFRESH_TOKEN);

        await setLS("token", ACCESS_TOKEN);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        dispatch(logIn());

        await history.push("/main");
      })
      .catch((err) => {
        console.log("Social Login Error", err);
        history.replace("/");
      });
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setLS("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteLS("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.username;
        draft.is_login = true;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  logOut,
  getUser,
  loginAction,
  kakaoLogin,
  signupAction,
};

export { actionCreators };
