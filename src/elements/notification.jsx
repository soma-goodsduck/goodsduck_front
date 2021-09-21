/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import React from "react";
import styled from "styled-components";
import { Flex, Image } from "./index";
import { blackBtn, white } from "../shared/colors";

import { history } from "../redux/configureStore";

const Notification = ({ data, clickUrl }) => {
  const handleClick = () => {
    history.push(clickUrl);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NotiBox onClick={() => handleClick()}>
        <UserBox>
          <Image
            shape="circle"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck.png"
            margin="0 10px 0 0"
            size="35px"
          />
          <InfoBox>
            <Flex>
              <TextBox>{data}</TextBox>
            </Flex>
          </InfoBox>
        </UserBox>
      </NotiBox>
    </div>
  );
};

const NotiBox = styled.div`
  width: 350px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 50px;
  cursor: pointer;
  z-index: 9999;

  -webkit-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextBox = styled.span`
  background-color: ${blackBtn};
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;

export default Notification;
