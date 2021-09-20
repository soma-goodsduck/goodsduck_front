import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Text } from "../../elements";
import { blackNav, grayBorder, grayBtnBorder } from "../../shared/colors";

import { actionCreators as userActions } from "../../redux/modules/user";
import { requestLogin } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const Login = () => {
  useEffect(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("likeIdolGroups");
    localStorage.removeItem("filtering");
    localStorage.removeItem("filter_idolGroup");
  }, []);

  const dispatch = useDispatch();
  const emailRef = useRef();
  const pwRef = useRef();

  const reqLogin = async () => {
    const json = {
      email: emailRef.current.value,
      password: pwRef.current.value,
    };
    const result = await requestLogin("v1/users/login", json);
    return result;
  };
  const handleLogin = async () => {
    const _handleLogin = await reqLogin();

    if (_handleLogin < 0) {
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("로그인에 실패했습니다."));
      history.replace("/login");
      return;
    }

    if (!_handleLogin.emailSuccess || !_handleLogin.passwordSuccess) {
      dispatch(userActions.setShowNotification(true));
      dispatch(
        userActions.setNotificationBody("이메일 또는 비밀번호가 틀렸습니다."),
      );
      history.replace("/login");
      return;
    }

    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("로그인에 성공했습니다."));
    history.replace("/");
  };

  return (
    <LoginContainer>
      <Logo />
      <div>
        <Flex is_flex is_col>
          <LoginInput type="text" placeholder="이메일" ref={emailRef} />
          <LoginInput type="password" placeholder="비밀번호" ref={pwRef} />
          <TextBtn
            justify="flex-end"
            margin="0 0 20px 0"
            size="14px"
            onClick={() => {
              history.replace("/find-email-pw");
            }}
          >
            이메일/비밀번호 찾기
          </TextBtn>
          <LoginBtn
            onClick={() => {
              handleLogin();
            }}
          >
            로그인
          </LoginBtn>

          <Flex is_flex justify="space-between" margin="10px 0">
            <Line />
            <Text margin="0 10px" color={grayBorder}>
              OR
            </Text>
            <Line />
          </Flex>
          <SignupBtn
            onClick={() => {
              history.replace("/signup");
            }}
          >
            회원가입
          </SignupBtn>
        </Flex>
        <Flex is_flex margin="30px 0 0 0">
          <TextBtn
            justify="center"
            onClick={() => {
              history.replace("/");
            }}
          >
            그냥 둘러볼게요
          </TextBtn>
        </Flex>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 10vh;

  @media screen and (max-width: 360px) {
    height: 95vh;
    margin-top: 0vh;
  }
  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const Logo = styled.div`
  width: 90vw;
  height: 250px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck_with_slogan.png");
  background-size: cover;
  background-repeat: no-repeat;

  @media screen and (max-width: 280px) {
    width: 100vw;
    height: 180px;
  }
  @media screen and (min-width: 415px) {
    width: 350px;
    height: 250px;
  }
`;

const LoginInput = styled.input`
  width: 80vw;
  height: 50px;
  background-color: #f2f3f6;
  border-radius: 5px;
  padding: 10px 8px;
  margin-bottom: 10px;

  &::placeholder {
    color: ${grayBtnBorder};
  }

  @media screen and (min-width: 415px) {
    width: 300px;
  }
`;

const LoginBtn = styled.button`
  width: 80vw;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(255, 226, 0, 1) 0%,
    rgba(255, 141, 41, 0.7) 100%
  );
  color: white;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 8px;
  margin-bottom: 10px;

  @media screen and (min-width: 415px) {
    width: 300px;
  }
`;

const SignupBtn = styled.button`
  width: 80vw;
  height: 50px;
  border: 2px solid rgb(255, 226, 0);
  color: #fda61d;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 8px;
  margin: 10px 0;

  @media screen and (min-width: 415px) {
    width: 300px;
  }
`;

const TextBtn = styled.div`
  width: 80vw;
  display: flex;
  justify-content: ${(props) => props.justify};
  margin: ${(props) => props.margin};
  cursor: pointer;
  color: ${blackNav};
  font-size: ${(props) => props.size};

  @media screen and (min-width: 415px) {
    width: 300px;
  }
`;

const Line = styled.div`
  width: 34vw;
  height: 1px;
  background-color: ${grayBorder};

  @media screen and (min-width: 415px) {
    width: 130px;
  }
`;

export default Login;
