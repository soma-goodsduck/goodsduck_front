/* eslint-disable import/no-cycle */
import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { blackBtn, grayBtn, white } from "../../shared/colors";
import { actionCreators as userActions } from "../../redux/modules/user";

const DeleteDoubleCheckModal = ({ text1, text2, onOkClick, onNoClick }) => {
  const dispatch = useDispatch();

  const handleOkClcik = () => {
    onOkClick();
    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("굿즈를 삭제했습니다."));
  };

  const handleNoClcik = () => {
    onNoClick();
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text1 style={{ marginBottom: "10px" }}>⚠️</Text1>
          <Text1>{text1}</Text1>
          <Text2 style={{ margin: "10px 0" }}>{text2}</Text2>
        </Info>
        <Btns>
          <NOBtn
            onClick={() => {
              handleNoClcik();
            }}
          >
            취소
          </NOBtn>
          <OKBtn
            onClick={() => {
              handleOkClcik();
            }}
          >
            확인
          </OKBtn>
        </Btns>
      </ModalBox>
    </Screen>
  );
};

DeleteDoubleCheckModal.defaultProps = {
  text: null,
  width: "200px",
  height: "100px",
  borderRadius: "10px",
  padding: "20px",
  margin: "",
  isBold: false,
  _onClick: () => {},
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ModalBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 40%;
`;

const Info = styled.div`
  position: relative;
  height: 150px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 5px 5px 0 0;
`;

const Text1 = styled.div`
  font-size: 16px;
  text-align: center;
`;
const Text2 = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OKBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 0 0 5px 0;
`;

const NOBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${grayBtn};
  border-radius: 0 0 0 5px;
`;

export default DeleteDoubleCheckModal;
