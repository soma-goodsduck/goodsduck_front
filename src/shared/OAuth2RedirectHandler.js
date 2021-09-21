import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { notification } from "./notification";
import Spinner from "./spinner";

import { actionCreators as userActions } from "../redux/modules/user";
import { requestPublicData } from "./axios";
import { history } from "../redux/configureStore";

const OAuth2RedirectHandler = () => {
  const dispatch = useDispatch();
  const href = window.location.href;
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  const state = params.get("state");

  const reqKakaoLogin = async () => {
    const result = await requestPublicData(`v1/users/login/kakao?code=${code}`);
    return result;
  };
  const kakaoLogin = async () => {
    const _kakaoLogin = await reqKakaoLogin();

    if (_kakaoLogin < 0) {
      history.push("/login");
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("로그인에 실패했습니다."));
      return;
    }

    if (_kakaoLogin.role === "ANONYMOUS") {
      dispatch(userActions.nonUserAction(_kakaoLogin.socialAccountId, "KAKAO"));
    } else {
      if (_kakaoLogin.isAgreeToNotification) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_FCM_TOKEN" }),
          );
        } else {
          notification();
        }
      }

      dispatch(userActions.loginAction(_kakaoLogin.jwt));
    }
  };

  const reqNaverLogin = async (clientId) => {
    const result = await requestPublicData(
      `v1/users/login/naver?code=${code}&state=${state}&clientId=${clientId}`,
    );
    return result;
  };
  const naverLogin = async (clientId) => {
    const _naverLogin = await reqNaverLogin(clientId);

    if (_naverLogin < 0) {
      history.push("/login");
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("로그인에 실패했습니다."));
      return;
    }

    if (_naverLogin.role === "ANONYMOUS") {
      dispatch(userActions.nonUserAction(_naverLogin.socialAccountId, "NAVER"));
    } else {
      if (_naverLogin.isAgreeToNotification) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_FCM_TOKEN" }),
          );
        } else {
          notification();
        }
      }

      dispatch(userActions.loginAction(_naverLogin.jwt));
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
    const result = await requestPublicData(
      `v1/users/login/apple?code=${appleCode}&idToken=${appleToken}&state=${process.env.REACT_APP_APPLE_STATE}`,
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
      history.push("/login");
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("로그인에 실패했습니다."));
      return;
    }

    if (_appleLogin.role === "ANONYMOUS") {
      dispatch(userActions.nonUserAction(_appleLogin.socialAccountId, "APPLE"));
    } else {
      if (_appleLogin.isAgreeToNotification) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "REQ_FCM_TOKEN" }),
          );
        } else {
          notification();
        }
      }

      dispatch(userActions.loginAction(_appleLogin.jwt));
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
  }, []);

  return <Spinner />;
};

export default OAuth2RedirectHandler;
