/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import { Icon, Text } from "../../elements";
import { blackBtn, darkRed, grayText } from "../../shared/colors";

import { actionCreators as userActions } from "../../redux/modules/user";

const Setting = (props) => {
  const dispatch = useDispatch();

  return (
    <>
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
            <Icon
              width="12px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
            />
          </BtnBox>
          {/* <BtnBox>
            <Text color={blackBtn} size="18px" medium>
              배송지 및 계좌 설정
            </Text>
            <Icon
              width="12px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
            />
          </BtnBox> */}
        </SettingBtn>
        {/* 서비스 정보 */}
        <SettingBtn>
          <Text color={grayText} size="16px" margin="0px 0 15px 0">
            서비스 정보
          </Text>
          <a href="https://soma-goodsduck.github.io/terms/service-policy.html">
            <BtnBox>
              <Text color={blackBtn} size="18px" medium>
                이용 약관
              </Text>
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
              />
            </BtnBox>
          </a>
          <a href="https://soma-goodsduck.github.io/terms/privacy.html">
            <BtnBox>
              <Text color={blackBtn} size="18px" medium>
                개인정보 처리방침
              </Text>
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
              />
            </BtnBox>
          </a>
          <a href="https://soma-goodsduck.github.io/terms/marketing-policy.html">
            <BtnBox>
              <Text color={blackBtn} size="18px" medium>
                마케팅 정보 활용 동의
              </Text>
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
              />
            </BtnBox>
          </a>
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
