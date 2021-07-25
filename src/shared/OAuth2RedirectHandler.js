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

  useEffect(() => {
    if (href.includes("/kakao")) {
      const kakao = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/kakao?code=${code}`,
          );
          console.log(result.data);
          if (result.data.response.role === "USER") {
            dispatch(userActions.loginAction(result.data.response.jwt));
          } else if (result.data.response.role === "ANONYMOUS") {
            dispatch(
              userActions.nonUserAction(
                result.data.response.socialAccountId,
                "KAKAO",
              ),
            );
          }
        } catch (error) {
          console.log("error", error);
          Sentry.captureException(error);
        }
      };
      kakao();
    } else if (href.includes("/naver")) {
      const naver = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACK_URL}/api/v1/users/login/naver?code=${code}&state=${state}`,
          );
          console.log(result.data);
          if (result.data.response.role === "USER") {
            dispatch(userActions.loginAction(result.data.response.jwt));
          } else if (result.data.response.role === "ANONYMOUS") {
            dispatch(
              userActions.nonUserAction(
                result.data.response.socialAccountId,
                "NAVER",
              ),
            );
          }
        } catch (error) {
          console.log("error", error);
          Sentry.captureException(error);
        }
      };
      naver();
    }
  });

  return <Spinner />;
};

export default OAuth2RedirectHandler;
