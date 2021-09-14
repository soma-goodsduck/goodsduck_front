/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./myProfilePage.module.css";

import HeaderInfo from "../../components/haeder/headerInfo";
import { Icon, Text, LoginPopUp } from "../../elements";
import { blackBtn, darkRed, grayText } from "../../shared/colors";
import { notification } from "../../shared/notification";
import { requestAuthData, deleteAction } from "../../shared/axios";

import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const Setting = () => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  const requestUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const fnEffect = async () => {
    const getUserData = await requestUserData();
    if (getUserData < 0) {
      if (getUserData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }
    setIsNotificationOn(getUserData.isAgreeToNotification);
  };
  useEffect(fnEffect, []);

  const notificationOn = () => {
    setIsNotificationOn(true);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "REQ_FCM_TOKEN" }),
      );
    } else {
      notification();
    }
  };

  const reqNotificationOff = async () => {
    const result = await deleteAction("v1/users/device");
    return result;
  };
  const notificationOff = async () => {
    const getUserData = await reqNotificationOff();
    if (getUserData < 0) {
      if (getUserData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }
    setIsNotificationOn(false);
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          <HeaderInfo text="설정" />
          <SettingBox>
            {/* 사용자 설정 */}
            <SettingBtn>
              <Text color={grayText} size="16px" margin="0 0 15px 0">
                사용자 설정
              </Text>
              <BtnBox>
                <Text color={blackBtn} size="18px" medium>
                  알림 설정
                </Text>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={isNotificationOn}
                    onChange={() =>
                      isNotificationOn ? notificationOff() : notificationOn()
                    }
                  />
                  <span className={styles.slider} />
                </label>
              </BtnBox>
              <BtnBox
                onClick={() => {
                  history.push("/edit-personal-information");
                }}
              >
                <Text color={blackBtn} size="18px" medium>
                  배송지 및 계좌 설정
                </Text>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </BtnBox>
            </SettingBtn>
            {/* 서비스 정보 */}
            <SettingBtn>
              <Text color={grayText} size="16px" margin="0px 0 15px 0">
                서비스 정보
              </Text>
              <BtnBox
                onClick={() => {
                  history.push("/service-policy");
                }}
              >
                <Text color={blackBtn} size="18px" medium>
                  이용 약관
                </Text>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </BtnBox>
              <BtnBox
                onClick={() => {
                  history.push("/privacy");
                }}
              >
                <Text color={blackBtn} size="18px" medium>
                  개인정보 처리방침
                </Text>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </BtnBox>
              <BtnBox
                onClick={() => {
                  history.push("/marketing-policy");
                }}
              >
                <Text color={blackBtn} size="18px" medium>
                  마케팅 정보 활용 동의
                </Text>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </BtnBox>
            </SettingBtn>
            {/* 로그아웃 & 탈퇴 */}
            <SettingBtn>
              <BtnBox
                onClick={() => {
                  dispatch(userActions.logoutAction());
                }}
              >
                <Text color={blackBtn} size="18px" medium>
                  로그아웃
                </Text>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </BtnBox>
              <BtnBox>
                <Text color={blackBtn} size="18px" medium color={darkRed}>
                  회원탈퇴
                </Text>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more_red.svg"
                />
              </BtnBox>
            </SettingBtn>
          </SettingBox>
        </div>
      )}
    </>
  );
};

const SettingBox = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 70px;
`;

const SettingBtn = styled.div`
  margin: 20px 0;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 18px 0;
  background-color: #ffffff;
  cursor: pointer;
`;

export default Setting;
