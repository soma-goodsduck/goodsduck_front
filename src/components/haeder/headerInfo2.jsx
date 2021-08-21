import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Text, Icon, PopUp2, PopUp3 } from "../../elements/index";

import { history } from "../../redux/configureStore";

const HeaderInfo2 = (props) => {
  const dispatch = useDispatch();

  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const {
    text1,
    text2,
    _onClick,
    _nickClick,
    isClick,
    type,
    margin,
    bg,
    borderRadius,
    isClear,
    popup1,
    popup2,
    userIdForReport,
  } = props;

  const styles = {
    margin,
    bg,
    borderRadius,
    isMobile,
    isClick,
    popup1,
    popup2,
  };

  const [showPopup1, setShowPopup1] = useState(false); // 옵션 1개
  const [showPopup2, setShowPopup2] = useState(false); // 옵션 2개

  const hidePopup1 = () => {
    setShowPopup1(false);
  };
  const hidePopup2 = () => {
    setShowPopup2(false);
  };

  const goBack = () => {
    if (isClear) {
      history.replace("/");
      return;
    }
    history.goBack();
  };

  const handleClick = () => {
    if (props.popup1) {
      setShowPopup1(true);
    } else if (props.popup2) {
      setShowPopup2(true);
    }
  };

  return (
    <>
      {showPopup1 && (
        <PopUp3
          text="신고하기"
          _onClick1={() => {
            history.push(`/report/${userIdForReport}`);
          }}
          _onClick2={() => {
            hidePopup1();
          }}
        />
      )}
      {showPopup2 && (
        <PopUp2
          text1="신고하기"
          text2={text1}
          _onClick1={() => {
            history.push(`/report/${userIdForReport}`);
          }}
          _onClick2={() => {
            _onClick();
            hidePopup2();
          }}
          _onClick3={() => hidePopup2()}
          isRed
        />
      )}
      {!showPopup2 && (
        <HeaderBox {...styles}>
          <Flex is_flex padding="15px 0">
            <Column1
              onClick={() => {
                goBack();
              }}
            >
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_back_b.svg"
              />
            </Column1>
            <Column2
              {...styles}
              onClick={() => {
                if (type === "chat") {
                  _nickClick();
                }
              }}
            >
              <Text is_center size="18px">
                {text2}
              </Text>
            </Column2>
            <Column3
              onClick={() => {
                handleClick();
              }}
            >
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_hamburger.svg"
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
  isClick: false,
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
  width: 50px;
  cursor: pointer;
`;
const Column2 = styled.div`
  width: 100%;
  text-align: center;
  ${(props) => props.isClick && "cursor: pointer;"};
`;

const Column3 = styled.div`
  float: right;
  width: 50px;
  text-align: right;
  cursor: pointer;
`;

export default HeaderInfo2;
