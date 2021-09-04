import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./header.module.css";
import { Flex, Text, Icon } from "../../elements/index";

import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as imgActions } from "../../redux/modules/image";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const HeaderInfo = (props) => {
  const dispatch = useDispatch();

  const {
    text,
    margin,
    bg,
    borderRadius,
    isClear,
    isReviewClear,
    isFiltering,
    isUploading,
  } = props;

  const styleProps = {
    margin,
    bg,
    borderRadius,
  };

  const history = useHistory();

  const goBack = () => {
    if (isClear) {
      dispatch(newItemActions.clearAction());
      dispatch(imgActions.clearImgAction());
      history.replace("/");
    } else if (isUploading) {
      history.push("/upload-item");
    } else if (isReviewClear) {
      dispatch(userActions.clearReview());
      history.goBack();
    } else if (isFiltering) {
      history.push("/filtering");
    } else {
      history.goBack();
    }
  };

  return (
    <HeaderBox {...styleProps} className={styles.headerInfoBox}>
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
  borderRadius: "",
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
`;
const Column2 = styled.div`
  width: 100%;
  text-align: center;
`;

export default HeaderInfo;
