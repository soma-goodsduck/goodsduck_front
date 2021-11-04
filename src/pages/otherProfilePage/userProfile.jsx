import React from "react";
import styled from "styled-components";
import styles from "../myProfilePage/myProfilePage.module.css";

import { Flex, Text, Image } from "../../elements";
import {
  yellow,
  blackBtn,
  gray,
  white,
  grayBtnText,
} from "../../shared/colors";
import { timeForToday } from "../../shared/functions";

const UserProfile = ({ user }) => {
  return (
    <UserProfileBox>
      <div style={{ position: "relative" }}>
        <Image
          shape="circle"
          src={user.imageUrl || "https://goods-duck.com/sample_goodsduck.png"}
          margin="0 20px 0 0"
          size="70px"
        />
      </div>
      {/* <TimeBox>{timeForToday(user.lastLoginAt)}</TimeBox> */}
      <Flex is_col align="flex-start">
        <Flex is_flex>
          <Image
            shape="circle"
            src={`https://goods-duck.com/icon/icon_level${user.level}.png`}
            size="25px"
            margin="0 10px 0 0"
          />
          <Text bold size="18px" color={user.role === "RESIGNED" ? gray : ""}>
            {user.role === "RESIGNED"
              ? `${user.nickName}(탈퇴)`
              : user.nickName}
          </Text>
        </Flex>
        <div className={styles.gaugeBox}>
          <Gauge style={{ width: `${user.exp < 100 ? user.exp : 100}%` }} />
          <GaugePercent>{user.exp < 100 ? user.exp : 100}%</GaugePercent>
        </div>
      </Flex>
    </UserProfileBox>
  );
};

const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
`;

const Gauge = styled.div`
  width: 57%;
  height: 20px;
  border-radius: 10px;
  background: ${yellow};
`;

const GaugePercent = styled.div`
  color: ${blackBtn};
  font-size: 0.7rem;
  padding-top: 2px;
  padding-right: 10px;
  position: absolute;
  top: 0;
  left: 45%;
`;

const TimeBox = styled.div`
  position: absolute;
  top: 115px;
  left: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 25px;
  background-color: ${white};
  color: ${grayBtnText};
  border: 1px solid ${gray};
  border-radius: 20px;
  font-size: 13px;
`;

export default UserProfile;
