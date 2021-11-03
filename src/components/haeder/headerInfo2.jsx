import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./header.module.css";
import { Flex, Text, Icon, PopUp2 } from "../../elements/index";

import { actionCreators as itemActions } from "../../redux/modules/item";
import { actionCreators as userActions } from "../../redux/modules/user";
import { postAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const HeaderInfo2 = memo((props) => {
  const dispatch = useDispatch();

  const href = window.location.href;
  const isChatRoom = href.indexOf("chat-room");
  const [chatRoomId, setChatRoomId] = useState("");

  useEffect(() => {
    if (isChatRoom !== -1) {
      const hrefList = href.split("/");
      setChatRoomId(hrefList[hrefList.length - 1]);
    }
  }, []);

  const {
    text1,
    text2,
    _onClick,
    _nickClick,
    isClick,
    isChat,
    type,
    margin,
    bg,
    borderRadius,
    isClear,
    popup1,
    popup2,
    userIdForReport,
  } = props;

  const styleProps = {
    margin,
    bg,
    borderRadius,
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

    if (isChat) {
      dispatch(itemActions.clearPriceProposeInfo());
    }

    if (chatRoomId !== "") {
      localStorage.setItem(
        `${chatRoomId}`,
        `${Math.round(new Date().getTime())}`,
      );
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

  const reqBlockUser = async (bcryptId) => {
    const result = await postAction(`v1/users/blocked-users/${bcryptId}`);
    return result;
  };

  const handleBlockUser = async (bcryptId) => {
    const blockUser = await reqBlockUser(bcryptId);
    if (blockUser < 0) {
      history.push("/error");
      return;
    }

    dispatch(userActions.setShowNotification(true));
    dispatch(
      userActions.setNotificationBody(
        "해당 유저의 글이 더 이상 보이지 않아요.",
      ),
    );
  };

  return (
    <>
      {showPopup1 && (
        <PopUp2
          text1="신고하기"
          text2={text1}
          _onClick1={() => {
            history.push(`/report/${userIdForReport}`);
          }}
          _onClick2={() => {
            handleBlockUser(userIdForReport);
            hidePopup1();
          }}
          _onClick3={() => hidePopup1()}
        />
      )}
      {showPopup2 && (
        <PopUp2
          text1="신고하기"
          text2={text1}
          _onClick1={() => {
            history.push(`/report/chat/${chatRoomId}/${userIdForReport}`);
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
        <HeaderBox {...styleProps} className={styles.headerInfoBox}>
          <Flex is_flex padding="15px 0">
            <Column1
              onClick={() => {
                goBack();
              }}
            >
              <Icon
                width="12px"
                src="https://goods-duck.com/icon/icon_back_b.svg"
              />
            </Column1>
            <Column2
              {...styleProps}
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
                src="https://goods-duck.com/icon/icon_hamburger.svg"
              />
            </Column3>
          </Flex>
        </HeaderBox>
      )}
    </>
  );
});

HeaderInfo2.defaultProps = {
  margin: "",
  bg: "#ffffff",
  borderRadius: "10px",
  isClick: false,
};

const HeaderBox = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.borderRadius};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  @media screen and (min-width: 415px) {
    width: 415px;
    left: 30%;
  }

  @media screen and (min-width: 500px) {
    left: 10%;
  }

  @media screen and (min-width: 850px) {
    left: 50%;
  }
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
