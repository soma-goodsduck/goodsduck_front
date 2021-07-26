import React from "react";
import styled from "styled-components";

import ChattingRow from "./chattingRow";
import { Text, PopUp } from "../../elements";
import Nav from "../../components/nav/nav";

const Chatting = (props) => {
  return (
    <>
      <ChattingBox>
        <Header>
          <Text bold size="18px">
            채팅
          </Text>
        </Header>
        <ChattingRow />
        <Nav />
      </ChattingBox>
    </>
  );
};

const ChattingBox = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export default Chatting;
