import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Text, Icon } from "../../elements/index";

import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as imgActions } from "../../redux/modules/image";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const HeaderInfo = (props) => {
  const dispatch = useDispatch();

  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const { text, margin, bg, borderRadius, isClear, isReviewClear } = props;

  const styles = {
    margin,
    bg,
    borderRadius,
    isMobile,
  };

  const history = useHistory();

  const goBack = () => {
    if (isClear) {
      dispatch(newItemActions.clearAction());
      dispatch(imgActions.clearImgAction());
      history.replace("/");
    } else if (isReviewClear) {
      dispatch(userActions.clearReview());
      history.goBack();
    } else {
      history.goBack();
    }
  };

  return (
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
            {text}
          </Text>
        </Column2>
      </Flex>
    </HeaderBox>
  );
};

HeaderInfo.defaultProps = {
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

export default HeaderInfo;
