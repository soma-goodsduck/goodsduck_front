import React, { useEffect } from "react";
import axios from "axios";
import * as Sentry from "@sentry/react";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "./spinner";

const OAuth2RedirectHandler = () => {
  const dispatch = useDispatch();
  const href = window.location.href;
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  const state = params.get("state");

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

  useEffect(() => {
    if (href.includes("/kakao")) {
      kakaoLogin();
    } else if (href.includes("/naver")) {
      _naverLogin();
    }
  });

  return <Spinner />;
};

export default OAuth2RedirectHandler;
