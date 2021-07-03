import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from "axios";
import { setCookie, deleteCookie } from "../../shared/cookie";

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
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
    history.push("/");
  };
};

// const kakaoLogin = (code, user) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "GET",
//       url: `/oauth/callback/kakao?code=${code}`,
//     })
//       .then(async (res) => {
//         const ACCESS_TOKEN = res.data.accessToken;
//         const REFRESH_TOKEN = res.data.refreshToken;

//         // refresh 토큰 쿠키저장
//         await setCookie("is_login", REFRESH_TOKEN);

//         // access 토큰 로컬에 저장(이전꺼 지우고)
//         // await localStorage.clear();
//         await localStorage.setItem("token", ACCESS_TOKEN);

//         // 헤더 설정
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${ACCESS_TOKEN}`;

//         dispatch(logIn());

//         // 메인화면 이동
//         await history.push("/main");
//       })
//       .catch((err) => {
//         console.log("소셜로그인 에러", err);
//         history.replace("/");
//       });
//   };
// };

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
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
  // kakaoLogin,
};

export { actionCreators };
