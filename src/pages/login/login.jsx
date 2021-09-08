import React, { useEffect } from "react";

import styled from "styled-components";

import { Flex, Button } from "../../elements";
import {
  NAVER_AUTH_URL_PROD,
  NAVER_AUTH_URL_DEV,
  KAKAO_AUTH_URL,
  APPLE_AUTH_URL,
} from "../../shared/OAuth";
import { history } from "../../redux/configureStore";

const Login = () => {
  const userAgent = window.navigator.userAgent;
  const isIOSApp = userAgent.indexOf("IOS APP");

  useEffect(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("likeIdolGroups");
    localStorage.removeItem("filtering");
    localStorage.removeItem("filter_idolGroup");
  }, []);

  return (
    <LoginBox>
      <Logo />
      <div>
        <Flex is_flex>
          <a
            href={
              process.env.REACT_APP_TYPE === "DEV"
                ? NAVER_AUTH_URL_DEV
                : NAVER_AUTH_URL_PROD
            }
          >
            <Button
              width="60px"
              height="60px"
              borderRadius="50%"
              margin="0 20px 0 0"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_naver.svg"
            />
          </a>
          <a href={KAKAO_AUTH_URL}>
            <Button
              width="60px"
              height="60px"
              borderRadius="50%"
              margin="0 20px 0 0"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_kakao.svg"
            />
          </a>
          {isIOSApp !== -1 && (
            <a href={APPLE_AUTH_URL}>
              <Button
                width="60px"
                height="60px"
                borderRadius="50%"
                margin="0 20px 0 0"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_apple.png"
              />
            </a>
          )}
        </Flex>
        <Flex is_flex margin="20px">
          <TextBtn
            onClick={() => {
              history.replace("/");
            }}
          >
            그냥 둘러볼게요
          </TextBtn>
        </Flex>
      </div>
    </LoginBox>
  );
};

const LoginBox = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20vh;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const Logo = styled.div`
  width: 80%;
  height: 70px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/logo.svg");
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextBtn = styled.div`
  display: flex;
  justify-contents: center;
  margin: 20px 0;
  padding-right: 20px;
  cursor: pointer;
`;

export default Login;
