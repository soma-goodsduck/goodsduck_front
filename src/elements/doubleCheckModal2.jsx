import React from "react";

import styled from "styled-components";
import { grayBtn, blackBtn, white } from "../shared/colors";

const DoubleCheckModal2 = (props) => {
  const { text, onOkClick, height } = props;

  const styles = {
    height,
  };

  const handleOkClcik = () => {
    onOkClick();
  };

  return (
    <Screen>
      <ModalBox>
        <Info {...styles}>
          <Text>{text}</Text>
        </Info>
        <OKBtn
          onClick={() => {
            handleOkClcik();
          }}
        >
          확인
        </OKBtn>
      </ModalBox>
    </Screen>
  );
};

DoubleCheckModal2.defaultProps = {
  height: "100px",
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
  height: ${(props) => props.height};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 5px 5px 0 0;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
`;

const OKBtn = styled.button`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: ${blackBtn};
  color: ${white};
  border-radius: 0 0 5px 5px;
`;

export default DoubleCheckModal2;
