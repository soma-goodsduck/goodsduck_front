import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "./spinner";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  const href = window.location.href;
  let params = new URL(document.location).searchParams;
  let code = params.get("code");
  let state = params.get("state");

  useEffect(() => {
    if (href.includes("/kakao")) {
      const kakao = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACK_LOCALHOST_URL_K}/oauth2/authorization/kakao?code=${code}`
          );
          console.log(result.data.kakao_account.profile);
          // dispatch(
          //   userActions.loginAction()
          // );
        } catch (error) {
          console.log("error", error);
        }
      };
      kakao();
    } else if (href.includes("/naver")) {
      const naver = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACK_LOCALHOST_URL_T}/oauth2/authorization/naver?code=${code}&state=${state}`
          );
          console.log(result.data.response);
          // dispatch(
          //   userActions.loginAction()
          // );
        } catch (error) {
          console.log("error", error);
        }
      };
      naver();
    }
  });

  return <Spinner />;
};

export default OAuth2RedirectHandler;
