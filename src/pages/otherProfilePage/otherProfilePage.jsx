import React, { useState, useEffect } from "react";

import styled from "styled-components";

import HeaderInfo2 from "../../components/haeder/headerInfo2";
import UserProfile from "./userProfile";
import Btns from "./btns";
import ItemList from "./itemList";
import ReviewList from "./reviewList";

import { grayBorder } from "../../shared/colors";
import { requestPublicData } from "../../shared/axios";

const OtherProfilePage = (props) => {
  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 1];

  const [user, setUser] = useState(null);
  const [btnsData, setBtnsData] = useState();
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const requestProfileData = async () => {
    const result = await requestPublicData(`v1/users/${bcrypt}`);
    return result;
  };
  const fnEffect = async () => {
    const userData = await requestProfileData();

    setUser(userData.user);
    setBtnsData({
      itemCount: userData.itemCount,
      reviewCount: userData.reviewCount,
      stampCount: userData.stampCount,
    });
    setReviews(userData.reviews);
    setItems(userData.items);
    setItemCount(userData.itemCount);
  };
  useEffect(fnEffect, []);

  return (
    <>
      {user && (
        <ProfilePageBox>
          <HeaderInfo2 text1="신고하기" text2="프로필 정보" isNotReport />
          <UserProfile user={user} />
          <Btns data={btnsData} />
          <Line />
          <ItemList items={items} itemCount={itemCount} />
          <Line />
          <ReviewList reviews={reviews} />
        </ProfilePageBox>
      )}
    </>
  );
};

const ProfilePageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
  margin: 25px 0;
`;

export default OtherProfilePage;
