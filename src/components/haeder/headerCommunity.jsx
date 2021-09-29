import React from "react";
import styled from "styled-components";
import { Text, Icon } from "../../elements";
import { history } from "../../redux/configureStore";

const HeaderCommunity = ({ text }) => {
  return (
    <Header>
      <Text bold size="18px">
        {text}
      </Text>
      <Icon
        width="18px"
        src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_hamburgerBars.svg"
        alt="menu"
        margin="0 5px 0 0"
        _onClick={() => {
          history.push("/community-menu");
        }}
      />
    </Header>
  );
};

const Header = styled.div`
  width: 100vw;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  @media screen and (min-width: 415px) {
    width: 415px;
    left: 30%;
  }

  @media screen and (min-width: 500px) {
    left: 10%;
  }

  @media screen and (min-width: 850px) {
    left: 50%;
  }
`;

export default HeaderCommunity;
