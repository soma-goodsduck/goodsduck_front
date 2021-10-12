import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import ItemList from "./itemList";

import { Text, Button, LoginPopUp, Spinner } from "../../elements";
import Btns from "./btns";
import UserProfile from "./userProfile";
import Nav from "../../components/nav/nav";

import { requestAuthData } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const MyProfilePage = () => {
  const dispatch = useDispatch();

  // 해당 유저 데이터 받아오기
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [myProfile, setMyProfile] = useState(null);
  const [items, setItems] = useState(null);
  const tradeStatus = useSelector((state) => state.user.filteringType);
  const [isLoading, setIsLoading] = useState(false);

  const requestUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const requestMyProfileData = async () => {
    const result = await requestAuthData(
      `v1/users/items?tradeStatus=${tradeStatus}`,
    );
    return result;
  };
  const fnEffect = async () => {
    setIsLoading(true);

    const userData = await requestUserData();
    const myProfileData = await requestMyProfileData();

    if (userData < 0 || myProfileData < 0) {
      if (userData === -201 || myProfileData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setIsLoading(false);
    setUser(userData);
    setMyProfile(myProfileData);
    setItems(myProfileData.items);
    dispatch(userActions.setUserItems(myProfileData.items));
    dispatch(userActions.setEmail(userData.email));

    if (window.ReactNativeWebView) {
      // 앱 자체에서 알림 허용/거절 확인
      await window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "REQ_AUTH_STATUS" }),
      );
    }
  };
  useEffect(fnEffect, [tradeStatus]);

  return (
    <>
      {showPopup && <LoginPopUp />}
      <div>
        <MyPageBox>
          <Header>
            <Text size="18px" bold>
              내 프로필
            </Text>
            <Button
              width="25px"
              height="25px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_setting.svg"
              _onClick={() => {
                history.push("/setting");
              }}
            />
          </Header>
          {isLoading && <Spinner />}
          {user && myProfile && items && (
            <>
              <UserProfile user={user} />
              <Btns myProfile={myProfile} />
              <ItemList items={items} />
            </>
          )}
          <Nav />
        </MyPageBox>
      </div>
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
