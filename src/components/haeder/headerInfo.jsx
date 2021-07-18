import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Flex, Text, Icon } from "../../elements/index";

import { actionCreators as imgActions } from "../../redux/modules/image";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const HeaderInfo = (props) => {
  const dispatch = useDispatch();
  const { text, padding, margin, isClear } = props;

  const styles = {
    padding,
    margin,
  };

  const history = useHistory();

  const goBack = () => {
    if (isClear) {
      dispatch(newItemActions.clearAction());
      dispatch(imgActions.clearImgAction());
      history.replace("/home");
      return;
    }
    history.goBack();
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
  padding: "",
  margin: "",
  bg: "#ffffff",
  _onClick: () => {},
};

const HeaderBox = styled.div`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
`;

const Column1 = styled.div`
  float: left;
`;
const Column2 = styled.div`
  width: 100%;
  text-align: center;
`;

export default HeaderInfo;
