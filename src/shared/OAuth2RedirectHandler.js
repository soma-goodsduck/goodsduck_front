import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { notification } from "./notification";
import Spinner from "./spinner";

import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

const OAuth2RedirectHandler = () => {
  const dispatch = useDispatch();
  const href = window.location.href;
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  const state = params.get("state");

  const reqKakaoLogin = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/kakao?code=${code}`,
    );
    return result;
  };
  const kakaoLogin = async () => {
    const _kakaoLogin = await reqKakaoLogin();

    if (_kakaoLogin < 0) {
      history.push("/error");
      return;
    }

    if (_kakaoLogin.data.response.role === "ANONYMOUS") {
      dispatch(
        userActions.nonUserAction(
          _kakaoLogin.data.response.socialAccountId,
          "KAKAO",
        ),
      );
    } else {
      if (_kakaoLogin.data.response.isAgreeToNotification) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_FCM_TOKEN" }),
          );
        } else {
          notification();
        }
      }

      dispatch(userActions.loginAction(_kakaoLogin.data.response.jwt));
    }
  };

  const reqNaverLogin = async (clientId) => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/naver?code=${code}&state=${state}&clientId=${clientId}`,
    );
    return result;
  };
  const naverLogin = async (clientId) => {
    const _naverLogin = await reqNaverLogin(clientId);

    if (_naverLogin < 0) {
      history.push("/error");
      return;
    }

    if (_naverLogin.data.response.role === "ANONYMOUS") {
      dispatch(
        userActions.nonUserAction(
          _naverLogin.data.response.socialAccountId,
          "NAVER",
        ),
      );
    } else {
      if (_naverLogin.data.response.isAgreeToNotification) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_FCM_TOKEN" }),
          );
        } else {
          notification();
        }
      }

      dispatch(userActions.loginAction(_naverLogin.data.response.jwt));
    }
  };

  const _naverLogin = () => {
    if (process.env.REACT_APP_TYPE === "DEV") {
      const clientId = process.env.REACT_APP_NAVER_CLIENT_ID_DEV;
      naverLogin(clientId);
    } else {
      const clientId = process.env.REACT_APP_NAVER_CLIENT_ID_PROD;
      naverLogin(clientId);
    }
  };

  const reqAppleLogin = async (appleCode, appleToken) => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/apple?code=${appleCode}&idToken=${appleToken}&state=${process.env.REACT_APP_APPLE_STATE}`,
    );
    return result;
  };
  const appleLogin = async () => {
    const appleHref = window.location.href.split("&");
    const appleCodeHref = appleHref[appleHref.length - 2].split("=");
    const appleCode = appleCodeHref[appleCodeHref.length - 1];
    const appleTokenHref = appleHref[appleHref.length - 1].split("=");
    const appleToken = appleTokenHref[appleTokenHref.length - 1];

    const _appleLogin = await reqAppleLogin(appleCode, appleToken);

    if (_appleLogin < 0) {
      history.push("/error");
      return;
    }

    if (_appleLogin.data.response.role === "ANONYMOUS") {
      dispatch(
        userActions.nonUserAction(
          _appleLogin.data.response.socialAccountId,
          "APPLE",
        ),
      );
    } else {
      if (_appleLogin.data.response.isAgreeToNotification) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_FCM_TOKEN" }),
          );
        } else {
          notification();
        }
      }

      dispatch(userActions.loginAction(_appleLogin.data.response.jwt));
    }
  };

  useEffect(() => {
    if (href.includes("/kakao")) {
      kakaoLogin();
    } else if (href.includes("/naver")) {
      _naverLogin();
    } else if (href.includes("/apple")) {
      appleLogin();
    }
  });

  return <Spinner />;
};

export default OAuth2RedirectHandler;
