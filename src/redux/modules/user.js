/* eslint-disable import/no-cycle */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { firebaseDatabase } from "../../shared/firebase";

import { notification } from "../../shared/notification";
import { setLS, deleteLS } from "../../shared/localStorage";
import { postActionForNonUser } from "../../shared/axios";

// actions
const SOCIAL_SIGN_UP = "SOCIAL_SIGN_UP";
const SET_IDOLS_FOR_SIGNUP = "SET_IDOLS_FOR_SIGNUP";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const UPDATE_JWT = "UPDATE_JWT";
const SET_FAV_IDOL_GROUPS = "SET_FAV_IDOL_GROUPS";
const SET_FILTERING_TYPE = "SET_FILTERING_TYPE";
const SET_USER_FOR_REVIEW = "SET_USER_FOR_REVIEW";
const SET_REVIEW = "SET_REVIEW";
const SET_NUM_OF_STAR = "SET_NUM_OF_STAR";
const CLEAR_REVIEW = "CLEAR_REVIEW";
const SET_USER_INFO = "SET_USER_INFO";
const SET_USER_ITEMS = "SET_USER_ITEMS";
const SET_ADDRESS = "SET_ADDRESS";
const SET_NAME = "SET_NAME";
const SET_PH_NUM = "SET_PH_NUM";
const SET_BANK_ACCOUNT = "SET_BANK_ACCOUNT";
const SET_BANK_NAME = "SET_BANK_NAME";
const SET_BANK_USER_NAME = "SET_BANK_USER_NAME";
const CLEAR_SETTING_INFO = "CLEAR_SETTING_INFO";
const SET_SHOW_NOTIFICATION = "SET_SHOW_NOTIFICATION";
const SET_NOTIFICATION_BODY = "SET_NOTIFICATION_BODY";
const SET_NOTIFICATION_LIST = "SET_NOTIFICATION_LIST";
const SET_EMAIL = "SET_EMAIL";
const SET_TODAY_VOTED_IDOL = "SET_TODAY_VOTED_IDOL";
const SET_AUTH_STATE = "SET_AUTH_STATE";

// action creators
const socialSignUp = createAction(SOCIAL_SIGN_UP, (id, type) => ({ id, type }));
const setIdolsForSignup = createAction(
  SET_IDOLS_FOR_SIGNUP,
  (idolsForSignup) => ({
    idolsForSignup,
  }),
);
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
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
const setUserInfo = createAction(SET_USER_INFO, (userNick, userImg) => ({
  userNick,
  userImg,
}));
const setUserItems = createAction(SET_USER_ITEMS, (items) => ({
  items,
}));
const setAddress = createAction(SET_ADDRESS, (address) => ({
  address,
}));
const setName = createAction(SET_NAME, (name) => ({
  name,
}));
const setPhNum = createAction(SET_PH_NUM, (phNum) => ({
  phNum,
}));
const setBankAccount = createAction(SET_BANK_ACCOUNT, (bankAccount) => ({
  bankAccount,
}));
const setBankName = createAction(SET_BANK_NAME, (bankName) => ({
  bankName,
}));
const setBankUserName = createAction(SET_BANK_USER_NAME, (bankUserName) => ({
  bankUserName,
}));
const clearSettingInfo = createAction(CLEAR_SETTING_INFO, () => ({}));
const setShowNotification = createAction(
  SET_SHOW_NOTIFICATION,
  (showNotification) => ({ showNotification }),
);
const setNotificationBody = createAction(
  SET_NOTIFICATION_BODY,
  (notificationBody) => ({ notificationBody }),
);
const setNotificationList = createAction(
  SET_NOTIFICATION_LIST,
  (notifications) => ({ notifications }),
);
const setEmail = createAction(SET_EMAIL, (email) => ({ email }));
const setTodayVotedIdol = createAction(SET_TODAY_VOTED_IDOL, (votedIdolId) => ({
  votedIdolId,
}));
const setAuthState = createAction(SET_AUTH_STATE, (authState) => ({
  authState,
}));

// initialState
const initialState = {
  user: "",
  type: null,
  id: null,
  email: "",
  idolsForSignup: 0,
  favIdolGroups: [],
  filteringType: "SELLING",
  userForReview: "",
  review: "",
  numOfStar: 0,
  userNick: "",
  userImg:
    "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png",
  items: [],
  address: "",
  name: "",
  phNum: "",
  bankAccount: "",
  bankName: "",
  bankUserName: "",
  showNotification: false,
  notificationBody: "",
  notifications: [],
  votedIdolId: 0,
  authState: "",
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
    dispatch(setShowNotification(true));
    dispatch(setNotificationBody("로그아웃 했습니다."));
    history.replace("/");
  };
};

// [소셜 로그인] 비회원인 경우, 회원가입 페이지로 이동
const nonUserAction = (id, type) => {
  return function (dispatch, getState, { history }) {
    dispatch(socialSignUp(id, type));
    history.push("/signup");
  };
};

// 자체 회원가입
const signupAction = (user) => {
  const json = {
    email: user.email,
    password: user.pw,
    nickName: user.nick,
    phoneNumber: user.phone,
    likeIdolGroupsId: user.idols,
    marketingAgree: user.isMarketingAgree,
  };

  return async function (dispatch, getState, { history }) {
    const signup = await postActionForNonUser("v2/users/sign-up", json);

    if (signup < 0) {
      history.replace("/sign-up");
      window.alert("회원가입에 실패했습니다.");
      return;
    }

    dispatch(logIn(signup.response.jwt));
    setLS("likeIdolGroups", user.idols);

    // chat badge 정보 저장
    firebaseDatabase
      .ref("users")
      .child(signup.response.userId)
      .update({ hasNewChat: false });

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "REQ_FCM_TOKEN" }),
      );
    } else {
      notification();
    }

    dispatch(setShowNotification(true));
    dispatch(setNotificationBody("회원가입에 성공했습니다."));
    history.push("/");
  };
};

// 소셜 로그인했을때 회원가입
const socialSignupAction = (user) => {
  const json = {
    email: user.email,
    nickName: user.nick,
    phoneNumber: user.phone,
    socialAccountId: user.id,
    socialAccountType: user.type,
    likeIdolGroupsId: user.idols,
  };
  return async function (dispatch, getState, { history }) {
    const signup = await postActionForNonUser("v1/users/sign-up", json);

    if (signup < 0) {
      history.replace("/login");
      window.alert("회원가입에 실패했습니다.");
      return;
    }

    dispatch(logIn(signup.data.response.jwt));
    setLS("likeIdolGroups", user.idols);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "REQ_FCM_TOKEN" }),
      );
    } else {
      notification();
    }

    dispatch(setShowNotification(true));
    dispatch(setNotificationBody("회원가입에 성공했습니다."));

    history.push("/");
    // window.location.reload();
  };
};

// reducer
export default handleActions(
  {
    [SOCIAL_SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
        draft.type = action.payload.type;
      }),
    [SET_IDOLS_FOR_SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.idolsForSignup = action.payload.idolsForSignup;
      }),

    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        setLS("jwt", draft.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteLS("jwt");
        deleteLS("likeIdolGroups");
        deleteLS("filtering");
        deleteLS("filter_idolGroup");
        draft.user = null;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
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
    [SET_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userNick = action.payload.userNick;
        draft.userImg = action.payload.userImg;
      }),
    [SET_USER_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.items = action.payload.items;
      }),
    [SET_ADDRESS]: (state, action) =>
      produce(state, (draft) => {
        draft.address = action.payload.address;
      }),
    [SET_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.name = action.payload.name;
      }),
    [SET_PH_NUM]: (state, action) =>
      produce(state, (draft) => {
        draft.phNum = action.payload.phNum;
      }),
    [SET_BANK_ACCOUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.bankAccount = action.payload.bankAccount;
      }),
    [SET_BANK_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.bankName = action.payload.bankName;
      }),
    [SET_BANK_USER_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.bankUserName = action.payload.bankUserName;
      }),
    [CLEAR_SETTING_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.address = "";
        draft.name = "";
        draft.phNum = "";
        draft.bankAccount = "";
        draft.bankName = "";
        draft.bankUserName = "";
      }),
    [SET_SHOW_NOTIFICATION]: (state, action) =>
      produce(state, (draft) => {
        draft.showNotification = action.payload.showNotification;
      }),
    [SET_NOTIFICATION_BODY]: (state, action) =>
      produce(state, (draft) => {
        draft.notificationBody = action.payload.notificationBody;
      }),
    [SET_NOTIFICATION_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.notifications = action.payload.notifications;
      }),
    [SET_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.email = action.payload.email;
      }),
    [SET_TODAY_VOTED_IDOL]: (state, action) =>
      produce(state, (draft) => {
        draft.votedIdolId = action.payload.votedIdolId;
      }),
    [SET_AUTH_STATE]: (state, action) =>
      produce(state, (draft) => {
        draft.authState = action.payload.authState;
      }),
  },
  initialState,
);

// action creator export
const actionCreators = {
  signupAction,
  socialSignupAction,
  setIdolsForSignup,
  loginAction,
  logoutAction,
  getUser,
  nonUserAction,
  updateJwt,
  setFavIdolGroups,
  setFilteringType,
  setUserForReview,
  setReview,
  setNumOfStar,
  clearReview,
  setUserInfo,
  setUserItems,
  setAddress,
  setName,
  setPhNum,
  setBankAccount,
  setBankName,
  setBankUserName,
  clearSettingInfo,
  setShowNotification,
  setNotificationBody,
  setNotificationList,
  setEmail,
  setTodayVotedIdol,
  setAuthState,
};

export { actionCreators };
