import React from "react";

import styled from "styled-components";
import { Icon, Text } from "../../elements";
import { blackBtn, yellow } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const ErrorPage = (props) => {
  return (
    <ErrorBox>
      <Icon width="50px" src="https://goods-duck.com/icon/icon_error.svg" />
      <Text size="22px" bold margin="20px 0">
        오류
      </Text>
      <Text size="16px" medium>
        죄송합니다. 알 수 없는 오류가 발생했습니다 :(
      </Text>
      <RefreshBtn
        onClick={() => {
          history.replace("/");
        }}
      >
        홈으로 돌아가기
      </RefreshBtn>
    </ErrorBox>
  );
};

const ErrorBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const RefreshBtn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 8px;
  background-color: ${yellow};
  color: ${blackBtn};
  font-weight: 500;
  margin-top: 40px;
`;

export default ErrorPage;
