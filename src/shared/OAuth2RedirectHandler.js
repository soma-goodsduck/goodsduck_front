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
            `${process.env.REACT_APP_BACK_URL}/api/v1/login/kakao?code=${code}`
          );
          console.log(result.data);
          if (result.data.role === "USER") {
            console.log(result.data);
            dispatch(userActions.loginAction(result.data.jwt));
          } else if (result.data.role === "ANONYMOUS") {
            console.log(result.data);
            dispatch(
              userActions.nonUserAction(result.data.socialAccountId, "KAKAO")
            );
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
            `${process.env.REACT_APP_BACK_URL}/api/v1/login/naver?code=${code}&state=${state}`
          );
          // console.log(result.data);
          // dispatch(userActions.nonUserAction(result.data.id, "NAVER"));
          if (result.data.role === "USER") {
            console.log(result.data);
            dispatch(userActions.loginAction(result.data.jwt));
          } else if (result.data.role === "ANONYMOUS") {
            console.log(result.data);
            dispatch(
              userActions.nonUserAction(result.data.socialAccountId, "NAVER")
            );
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
