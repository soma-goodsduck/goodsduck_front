import React from "react";
import styled from "styled-components";
import styles from "./mypage.module.css";

import { Flex, Text, Image } from "../../elements";
import { yellow, black } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const UserProfile = ({ user }) => {
  return (
    <UserProfileBox
      onClick={() => {
        history.push("/myProfile");
      }}
    >
      <Image
        shape="circle"
        src={
          user.imageUrl ||
          "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
        }
        margin="0 7px 0 0"
        size="80px"
      />
      <Flex is_col align="flex-start">
        <Flex is_flex>
          <Image
            shape="circle"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_level.svg"
            size="25px"
            margin="0 10px 0 0"
          />
          <Text bold size="18px">
            {user.nickName}
          </Text>
        </Flex>
        <div className={styles.gaugeBox}>
          <Gauge>
            <GaugePercent>57%</GaugePercent>
          </Gauge>
        </div>
      </Flex>
    </UserProfileBox>
  );
};

const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Gauge = styled.div`
  width: 57%;
  height: 20px;
  border-radius: 10px;
  background: ${yellow};
`;

const GaugePercent = styled.div`
  color: ${black};
  font-size: 0.8rem;
  text-align: right;
  padding-top: 2px;
  padding-right: 10px;
`;

export default UserProfile;
