import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemList from "./itemList";

import { Text, Button } from "../../elements";
import Btns from "./btns";
import UserProfile from "./userProfile";
import Nav from "../../components/nav/nav";

import { getData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const MyPage = () => {
  // 해당 유저 데이터 받아오기
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = getData("user/lookup");
    getUserData.then((result) => {
      setUser(result);
    });
  }, []);

  return (
    <>
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
          <Btns />
          <ItemList />
          <Nav />
        </MyPageBox>
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

export default MyPage;
