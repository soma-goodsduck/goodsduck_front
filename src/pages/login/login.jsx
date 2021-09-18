import React, { useEffect } from "react";

import styled from "styled-components";
import { Flex } from "../../elements";
import { blackNav } from "../../shared/colors";

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
        <Flex is_flex is_col>
          <a
            href={
              process.env.REACT_APP_TYPE === "DEV"
                ? NAVER_AUTH_URL_DEV
                : NAVER_AUTH_URL_PROD
            }
          >
            <LoginBtn color="#3FC800">
              <LoginInfo>
                <LoginIcon src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_naver.svg" />
                <LoginText color="white">네이버로 로그인</LoginText>
              </LoginInfo>
            </LoginBtn>
          </a>
          <a href={KAKAO_AUTH_URL}>
            <LoginBtn color="#FFDF00">
              <LoginInfo>
                <LoginIcon src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_kakao.svg" />
                <LoginText color="black">카카오로 로그인</LoginText>
              </LoginInfo>
            </LoginBtn>
          </a>
          {isIOSApp !== -1 && (
            <a href={APPLE_AUTH_URL}>
              <LoginBtn color="#040404">
                <LoginInfo>
                  <LoginIcon src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_apple.png" />
                  <LoginText color="white">APPLE로 로그인</LoginText>
                </LoginInfo>
              </LoginBtn>
            </a>
          )}
        </Flex>
        <Flex is_flex margin="10px 0 0 0">
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
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 15vh;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const Logo = styled.div`
  width: 350px;
  height: 250px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck_with_slogan.png");
  background-size: contain;
  background-repeat: no-repeat;

  @media screen and (min-width: 415px) {
    width: 350px;
    height: 350px;
  }
`;

const TextBtn = styled.div`
  display: flex;
  justify-contents: center;
  cursor: pointer;
  color: ${blackNav};
`;

const LoginBtn = styled.button`
  width: 75vw;
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${(props) => props.color};

  @media screen and (min-width: 415px) {
    width: 300px;
    height: 50px;
  }
`;

const LoginInfo = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};

  @media screen and (min-width: 415px) {
    font-size: 16px;
  }
`;

const LoginIcon = styled.div`
  width: 35px;
  height: 35px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Login;
