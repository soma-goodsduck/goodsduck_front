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
            `${process.env.REACT_APP_BACK_LOCALHOST_URL_K}/api/v1/oauth2/authorization/kakao?code=${code}`
          );
          console.log(result.data);
          if (result.data.isExist) {
            dispatch(userActions.loginAction(result.data.id));
          } else {
            console.log(result.data.id);
            dispatch(userActions.nonUserAction(result.data.id, "KAKAO"));
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      kakao();
    } else if (href.includes("/naver")) {
      const naver = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACK_LOCALHOST_URL_T}/api/v1/oauth2/authorization/naver?code=${code}&state=${state}`
          );
          console.log(result.data);
          if (result.data.isExist) {
            dispatch(userActions.loginAction(result.data.email));
          } else {
            console.log(result.data.id);
            dispatch(userActions.nonUserAction(result.data.id, "NAVER"));
          }
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
