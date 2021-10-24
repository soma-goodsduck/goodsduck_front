import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Icon, Text, Flex, LoginPopUp, Spinner } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";
import NotificationRow from "./notificationRow";
import { grayBtnText } from "../../shared/colors";

import { requestAuthData, deleteAction } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const NotificationPage = () => {
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.user.notifications);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestNotifications = async () => {
    const result = await requestAuthData("v2/users/notifications");
    return result;
  };
  const fnEffect = async () => {
    setIsLoading(true);

    const getNotifications = await requestNotifications();

    if (getNotifications < 0) {
      if (getNotifications === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setIsLoading(false);
    dispatch(userActions.setNotificationList(getNotifications));
  };
  useEffect(fnEffect, []);

  const reqDeleteNotifications = async () => {
    const result = await deleteAction("v1/users/notifications");
    return result;
  };
  const handleDeleteNotifications = async () => {
    const _handleDeleteNotifications = await reqDeleteNotifications();

    if (_handleDeleteNotifications.response) {
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("알림을 전체 삭제했습니다."));
      dispatch(userActions.setNotificationList([]));
    }
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      <div>
        <HeaderInfo text="알림" padding="0 16px" />
        <Flex is_flex justify="flex-end" margin="55px 20px 0 0">
          <DeleteBtn
            onClick={() => {
              handleDeleteNotifications();
            }}
          >
            <Icon
              width="16px"
              margin="0 7px 0 0"
              src="https://goods-duck.com/icon/icon_uncheckbox.svg"
            />
            <Text color={grayBtnText}>전체 알림 삭제</Text>
          </DeleteBtn>
        </Flex>
        {isLoading && <Spinner />}
        {notifications.length === 0 && (
          <Notice>
            <NoticeText>받은 알림이 없습니다!</NoticeText>
          </Notice>
        )}
        {notifications !== null && (
          <NotificationRowBox>
            {notifications.map((notification, idx) => (
              <NotificationRow key={idx} notification={notification} />
            ))}
          </NotificationRowBox>
        )}
      </div>
    </>
  );
};

const NotificationRowBox = styled.div`
  overflow-y: auto;
  height: 95vh;
  margin-top: 10px;
`;

const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const NoticeText = styled.div`
  padding: 7px 0;
  font-weight: 500;
`;

export default NotificationPage;
