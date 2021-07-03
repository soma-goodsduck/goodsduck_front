import React from "react";
import { Grid, Button } from "../elements";
import axios from "axios";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Test = (props) => {
  const dispatch = useDispatch();
  let params = new URL(document.location).searchParams;
  let code = params.get("code");
  let state = params.get("state");

  const kakao = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACK_LOCALHOST_URL_K}/oauth2/authorization/kakao?code=${code}`
      );
      console.log(result.data.kakao_account.profile);
      dispatch(
        userActions.logIn({
          user_name: result.data.kakao_account.profile.nickname,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const naver = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACK_LOCALHOST_URL_T}/oauth2/authorization/naver?code=${code}&state=${state}`
      );
      console.log(result.data.response);
      dispatch(userActions.logIn({ user_name: result.data.response.name }));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid is_flex>
      <Button
        text="카카오"
        width="50px"
        height="50px"
        _onClick={() => {
          kakao();
        }}
      />
      <Button
        text="네이버"
        width="50px"
        height="50px"
        _onClick={() => {
          naver();
        }}
      />
    </Grid>
  );
};

export default Test;
