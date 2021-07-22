import React from "react";
import { useDispatch } from "react-redux";

import PopUp from "./popUp";

import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

const LoginPopUp = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    history.replace("/login");
    dispatch(userActions.noShowPopupAction());
  };

  return (
    <PopUp
      is_bold
      width="250px"
      height="120px"
      text1="👉 로그인 하러가기"
      text2="그냥 둘러볼게요"
      _onClick={() => handleClick()}
    />
  );
};

export default LoginPopUp;
