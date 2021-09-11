import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./myProfilePage.module.css";

import { Flex, Text, Image } from "../../elements";
import { yellow, blackBtn } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const UserProfile = ({ user }) => {
  const { userNick, userImg } = useSelector((state) => ({
    userNick: state.user.userNick,
    userImg: state.user.userImg,
  }));

  return (
    <UserProfileBox
      onClick={() => {
        history.push("/edit-profile");
      }}
    >
      <Image
        shape="circle"
        src={
          userImg ===
          "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
            ? user.imageUrl
            : userImg
        }
        margin="0 7px 0 0"
        size="80px"
      />
      <Flex is_col align="flex-start">
        <Flex is_flex>
          <Image
            shape="circle"
            src={`https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_level${user.level}.png`}
            size="25px"
            margin="0 10px 0 0"
          />
          <Text bold size="18px">
            {userNick === "" ? user.nickName : userNick}
          </Text>
        </Flex>
        <div className={styles.gaugeBox}>
          <Gauge style={{ width: `${user.exp}%` }}>
            <GaugePercent>{user.exp}%</GaugePercent>{" "}
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
  height: 20px;
  border-radius: 10px;
  background: ${yellow};
`;

const GaugePercent = styled.div`
  color: ${blackBtn};
  font-size: 0.7rem;
  text-align: right;
  padding-top: 2px;
  padding-right: 10px;
`;

export default UserProfile;
