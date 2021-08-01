import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Flex, Text, Icon, PopUp3 } from "../../elements/index";

import { history } from "../../redux/configureStore";

const HeaderInfo2 = (props) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const { text1, text2, _onClick, margin, bg, borderRadius, isClear } = props;

  const styles = {
    margin,
    bg,
    borderRadius,
    isMobile,
  };

  const [showPopup, setShowPopup] = useState(false);
  const hidePopup = () => {
    setShowPopup(false);
  };

  const goBack = () => {
    if (isClear) {
      history.replace("/");
      return;
    }
    history.goBack();
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && (
        <PopUp3
          text={text1}
          _onClick1={() => {
            _onClick();
            hidePopup();
          }}
          _onClick2={() => hidePopup()}
        />
      )}
      {!showPopup && (
        <HeaderBox {...styles}>
          <Flex is_flex padding="15px 0">
            <Column1>
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_back_b.svg"
                _onClick={() => {
                  goBack();
                }}
              />
            </Column1>
            <Column2>
              <Text is_center size="18px">
                {text2}
              </Text>
            </Column2>
            <Column3>
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_hamburger.svg"
                _onClick={() => {
                  handleClick();
                }}
              />
            </Column3>
          </Flex>
        </HeaderBox>
      )}
    </>
  );
};

HeaderInfo2.defaultProps = {
  margin: "",
  bg: "#ffffff",
  borderRadius: "10px",
};

const HeaderBox = styled.div`
  ${(props) => (props.isMobile ? "width: 100%" : "width: 415px")};
  padding: 0 20px;
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.borderRadius};
  position: fixed;
  top: 0;
  ${(props) => (props.isMobile ? "left: 0;" : "left: 30%;")};
  z-index: 3;
`;

const Column1 = styled.div`
  float: left;
`;
const Column2 = styled.div`
  width: 100%;
  text-align: center;
`;

const Column3 = styled.div`
  float: right;
`;

export default HeaderInfo2;
