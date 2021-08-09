import React, { useState } from "react";
import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import LoginPopUp from "../../elements/loginPopUp";
import NotificationRow from "./notificationRow";

const NotificationPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "price-propose",
      user: {
        nickName: "밍밍",
        imageUrl:
          "https://newsimg.hankookilbo.com/cms/articlerelease/2020/11/23/51c796f6-55b3-496d-8572-ce98d97ea038.jpg",
      },
      item: {
        name: "시우민 포스터 팔아여",
      },
      proposedPrice: 15000,
      createdAt: 1627799751243,
    },
    {
      id: 2,
      type: "review",
      user: {
        nickName: "밍밍",
        imageUrl:
          "https://newsimg.hankookilbo.com/cms/articlerelease/2020/11/23/51c796f6-55b3-496d-8572-ce98d97ea038.jpg",
      },
      item: {
        name: "시우민 포스터 팔아여",
      },
      proposedPrice: 15000,
      createdAt: 1627799751243,
    },
  ];

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          <HeaderInfo text="알림" padding="0 16px" />
          <NotificationRowBox>
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
              />
            ))}
          </NotificationRowBox>
        </div>
      )}
    </>
  );
};

const NotificationRowBox = styled.div`
  margin-top: 60px;
  padding: 0 16px;
`;

export default NotificationPage;
