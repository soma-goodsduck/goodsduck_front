import React, { useState, useEffect } from "react";

import styled from "styled-components";

import HeaderInfo2 from "../../components/haeder/headerInfo2";
import UserProfile from "./userProfile";
import Btns from "./btns";
import ItemList from "./itemList";
import ReviewList from "./reviewList";
import { LoginPopUp } from "../../elements";

import { grayBorder } from "../../shared/colors";
import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const OtherProfilePage = (props) => {
  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 1];

  const [user, setUser] = useState(null);
  const [btnsData, setBtnsData] = useState();
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const requestProfileData = async () => {
    const result = await requestPublicData(`v1/users/${bcrypt}`);
    return result;
  };
  const fnEffect = async () => {
    const userData = await requestProfileData();

    if (userData < 0) {
      if (userData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    if (userData.user.role === "RESIGNED") {
      setUser(userData.user);
      setBtnsData({
        itemCount: 0,
        reviewCount: 0,
      });
      setReviews([]);
      setItems([]);
      setItemCount(0);
      return;
    }

    setUser(userData.user);
    setBtnsData({
      itemCount: userData.itemCount,
      reviewCount: userData.reviewCount,
    });
    setReviews(userData.reviews);
    setItems(userData.items);
    setItemCount(userData.itemCount);
  };
  useEffect(fnEffect, []);

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          {user && (
            <ProfilePageBox>
              <HeaderInfo2
                text1="신고하기"
                text2="프로필 정보"
                popup1
                userIdForReport={bcrypt}
              />
              <UserProfile user={user} />
              <Btns data={btnsData} />
              <Line />
              <ItemList items={items} itemCount={itemCount} />
              <Line />
              <ReviewList reviews={reviews} />
            </ProfilePageBox>
          )}
        </div>
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
