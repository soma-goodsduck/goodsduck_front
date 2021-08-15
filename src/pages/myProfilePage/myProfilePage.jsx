import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import ItemList from "./itemList";

import { Text, Button, LoginPopUp } from "../../elements";
import Btns from "./btns";
import UserProfile from "./userProfile";
import Nav from "../../components/nav/nav";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const MyProfilePage = () => {
  // 해당 유저 데이터 받아오기
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [myProfile, setMyProfile] = useState(null);
  const [items, setItems] = useState(null);
  const tradeStatus = useSelector((state) => state.user.filteringType);

  const requestUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    if (result === "login") {
      setShowPopup(true);
    }
    return result;
  };
  const requestMyProfileData = async () => {
    const result = await requestAuthData(
      `v1/users/items?tradeStatus=${tradeStatus}`,
    );
    if (result === "login") {
      setShowPopup(true);
    }
    return result;
  };
  const fnEffect = async () => {
    const userData = await requestUserData();
    const myProfileData = await requestMyProfileData();

    setUser(userData);
    setMyProfile(myProfileData);
    setItems(myProfileData.items);
  };
  useEffect(fnEffect, [tradeStatus]);

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          {user && (
            <MyPageBox>
              <Header>
                <Text size="20px" bold>
                  내 프로필
                </Text>
                <Button
                  width="30px"
                  height="30px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_setting.svg"
                  _onClick={() => {
                    history.push("/setting");
                  }}
                />
              </Header>
              <UserProfile user={user} />
              <Btns myProfile={myProfile} />
              <ItemList items={items} />
              <Nav />
            </MyPageBox>
          )}
        </div>
      )}
    </>
  );
};

const MyPageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export default MyProfilePage;
