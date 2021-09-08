import React from "react";

import styled from "styled-components";
import { Icon, Text } from "../../elements";
import { yellow } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const ErrorPage = (props) => {
  return (
    <ErrorBox>
      <Icon
        width="50px"
        src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_error.svg"
      />
      <Text size="22px" bold margin="20px 0">
        오류
      </Text>
      <Text size="16px" medium>
        일시적인 네트워크 장애가 발생했습니다.
      </Text>
      <RefreshBtn
        onClick={() => {
          history.goBack();
        }}
      >
        페이지 새로고침
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
  font-weight: 500;
  margin-top: 40px;
`;

export default ErrorPage;
