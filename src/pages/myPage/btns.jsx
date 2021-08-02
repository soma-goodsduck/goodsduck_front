import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Icon, Flex, Text } from "../../elements";
import { grayText } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const Btns = (props) => {
  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  return (
    <Flex {...styleProps}>
      <BtnGrid isMobile>
        <Flex
          is_col
          pointer
          _onClick={() => {
            history.push("/favorites");
          }}
        >
          <Text bold size="22px">
            23
          </Text>
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            찜
          </Text>
        </Flex>
        <Flex is_col>
          <Text bold size="22px">
            16
          </Text>
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            후기
          </Text>
        </Flex>
        <Flex
          is_col
          pointer
          _onClick={() => {
            history.push("/price-proposes");
          }}
        >
          <Text bold size="22px">
            16
          </Text>
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            가격제시
          </Text>
        </Flex>
        {/* <Flex is_col>
          <Text bold size="22px">
            112
          </Text>
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            투표권
          </Text>
        </Flex>
        <Flex is_col>
          <Text bold size="22px">
            9/10
          </Text>
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            보증스탬프
          </Text>
        </Flex>
        <Flex is_col>
          <Icon
            width="40px"
            margin="0 auto"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_ad.svg"
          />
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            광고시청
          </Text>
        </Flex>
        <Flex is_col>
          <Icon
            width="40px"
            margin="0 auto"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_fame.svg"
          />
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            명예전당
          </Text>
        </Flex>
        <Flex is_col>
          <Icon
            width="40px"
            margin="0 auto"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_notice.svg"
          />
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            공지사항
          </Text>
        </Flex> */}
        <Flex is_col>
          <Icon
            width="40px"
            margin="0 auto"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_customer.png"
          />
          <Text size="15px" margin="10px 0 0 0" color={grayText}>
            고객센터
          </Text>
        </Flex>
      </BtnGrid>
    </Flex>
  );
};

const BtnGrid = styled.div`
  display: grid;
  ${(props) =>
    props.isMobile
      ? "grid-template-columns: repeat(4, 85px);"
      : "grid-template-columns: repeat(4, 100px);"};
  grid-auto-rows: 80px;
  margin-top: 20px;
`;

export default Btns;
