import React, { useEffect } from "react";

import styled from "styled-components";
import { Flex, Button } from "../../elements";
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from "../../shared/OAuth";
import { history } from "../../redux/configureStore";

const Login = (props) => {
  useEffect(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("likeIdolGroups");
    localStorage.removeItem("filtering");
    localStorage.removeItem("filter_idolGroup");
  }, []);

  return (
    <Flex is_col>
      <Logo />
      <Flex is_flex>
        <a href={NAVER_AUTH_URL}>
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
    </Flex>
  );
};

const Logo = styled.div`
  width: 80%;
  height: 70px;
  margin: 250px auto;
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
