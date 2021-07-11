import React from "react";
import { Flex, Button } from "../../elements";
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from "../../shared/OAuth";
import { history } from "../../redux/configureStore";

const Login = (props) => {
  return (
    <>
      <Flex margin="250px 0 50px 0">
        <button
          type="button"
          onClick={() => {
            history.push("/home");
          }}
        >
          둘러보기
        </button>
      </Flex>
      <Flex margin="0 auto">
        <a href={NAVER_AUTH_URL}>
          <Button
            width="50px"
            height="50px"
            borderRadius="50%"
            margin="0 20px 0 0"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_naver.png"
          />
        </a>

        <a href={KAKAO_AUTH_URL}>
          <Button
            width="50px"
            height="50px"
            borderRadius="50%"
            margin="0 20px 0 0"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/logo_kakao.png"
          />
        </a>
      </Flex>
    </>
  );
};

export default Login;
