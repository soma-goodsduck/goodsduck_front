import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";
import * as Sentry from "@sentry/react";

import { actionCreators as userActions } from "../redux/modules/user";

import { notification } from "./notification";
import Spinner from "./spinner";

const OAuth2RedirectHandler = () => {
  const userAgent = window.navigator.userAgent;
  const isIOSApp = userAgent.indexOf("IOS APP");

  const dispatch = useDispatch();
  const href = window.location.href;
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  const state = params.get("state");
  let appleCode;
  let appleToken;

  if (isIOSApp !== -1) {
    const appleHref = window.location.href.split("&");
    const appleCodeHref = appleHref[appleHref.length - 2].split("=");
    appleCode = appleCodeHref[appleCodeHref.length - 1];
    const appleTokenHref = appleHref[appleHref.length - 1].split("=");
    appleToken = appleTokenHref[appleTokenHref.length - 1];
  }

  const kakaoLogin = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/kakao?code=${code}`,
      );
      if (result.data.response.role === "ANONYMOUS") {
        dispatch(
          userActions.nonUserAction(
            result.data.response.socialAccountId,
            "KAKAO",
          ),
        );
      } else {
        if (result.data.response.isAgreeToNotification) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: "REQ_FCM_TOKEN" }),
            );
          } else {
            notification();
          }
        }

        dispatch(userActions.loginAction(result.data.response.jwt));
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  };

  const naverLogin = async (clientId) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/naver?code=${code}&state=${state}&clientId=${clientId}`,
      );
      if (result.data.response.role === "ANONYMOUS") {
        dispatch(
          userActions.nonUserAction(
            result.data.response.socialAccountId,
            "NAVER",
          ),
        );
      } else {
        if (result.data.response.isAgreeToNotification) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: "REQ_FCM_TOKEN" }),
            );
          } else {
            notification();
          }
        }

        dispatch(userActions.loginAction(result.data.response.jwt));
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
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

  const appleLogin = async () => {
    console.log(appleCode, appleToken);

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/apple?code=${appleCode}&idToken=${appleToken}&state=${process.env.REACT_APP_APPLE_STATE}`,
      );

      console.log(result);
      if (result.data.response.role === "ANONYMOUS") {
        dispatch(
          userActions.nonUserAction(
            result.data.response.socialAccountId,
            "APPLE",
          ),
        );
      } else {
        if (result.data.response.isAgreeToNotification) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: "REQ_FCM_TOKEN" }),
            );
          } else {
            notification();
          }
        }

        dispatch(userActions.loginAction(result.data.response.jwt));
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
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
