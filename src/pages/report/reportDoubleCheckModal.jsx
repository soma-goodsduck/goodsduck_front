/* eslint-disable import/no-cycle */
import React from "react";

import styled from "styled-components";
import { green } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const ReportDoubleCheckModal = (props) => {
  const { text, onOkClick } = props;

  const handleOkClcik = () => {
    onOkClick();
  };

  const handleNoClcik = () => {
    history.goBack();
  };

  return (
    <Screen>
      <ModalBox>
        <Info>
          <Text>{text}</Text>
        </Info>
        <Btns>
          <OKBtn
            onClick={() => {
              handleOkClcik();
            }}
          >
            네
          </OKBtn>
          <NOBtn
            onClick={() => {
              handleNoClcik();
            }}
          >
            아니오
          </NOBtn>
        </Btns>
      </ModalBox>
    </Screen>
  );
};

ReportDoubleCheckModal.defaultProps = {
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
  height: 90px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 5px;
`;

const Text = styled.button`
  font-family: "Do Hyeon", sans-serif;
  font-size: 18px;
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
  background-color: #ffffff;
  color: ${green};
  border-radius: 5px;
  margin-right: 15px;
  transition: transform 200ms ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

const NOBtn = styled.button`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  transition: transform 200ms ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

export default ReportDoubleCheckModal;