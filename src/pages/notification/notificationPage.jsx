import React, { useEffect, useState } from "react";
import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import LoginPopUp from "../../elements/loginPopUp";
import NotificationRow from "./notificationRow";
import { requestAuthData } from "../../shared/axios";

const NotificationPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const getNotifications = requestAuthData("v1/users/notifications");
    getNotifications.then((result) => {
      if (result === "login") {
        setShowPopup(true);
        return;
      }
      setNotifications(result);
    });
  }, []);

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          <HeaderInfo text="알림" padding="0 16px" />
          {notifications !== null && (
            <NotificationRowBox>
              {notifications.map((notification, idx) => (
                <NotificationRow key={idx} notification={notification} />
              ))}
            </NotificationRowBox>
          )}
        </div>
      )}
    </>
  );
};

const NotificationRowBox = styled.div`
  overflow-y: auto;
  height: 95vh;
  margin-top: 40px;
`;

export default NotificationPage;
