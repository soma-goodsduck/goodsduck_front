import React from "react";

import styled from "styled-components";
import { Icon, Text } from "../../elements";
import { yellow, blackBtn } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const NotFoundPage = (props) => {
  return (
    <ErrorBox>
      <Icon width="50px" src="https://goods-duck.com/icon/icon_error.svg" />
      <Text size="22px" bold margin="20px 0">
        찾을 수 없는 페이지입니다.
      </Text>
      <Text size="16px" medium>
        요청하신 페이지가 사라졌거나,
      </Text>
      <Text size="16px" medium margin="5px 0">
        잘못된 경로를 이용했습니다 :(
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

export default NotFoundPage;
