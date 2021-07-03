import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code));
  }, []);

  return <h1>test</h1>;
};

export default OAuth2RedirectHandler;
