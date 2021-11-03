import React, { memo } from "react";

import styled from "styled-components";
import { Icon, Flex, Text } from "../../elements";
import { grayText } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const Btns = memo(({ myProfile }) => {
  return (
    <>
      {myProfile && (
        <Flex margin="15px">
          <BtnGrid>
            <Flex
              is_col
              justify="space-between"
              pointer
              _onClick={() => {
                history.push("/favorites");
              }}
            >
              <Text bold size="22px" margin="5px 0 0 0">
                {myProfile.countOfLikes > 9999
                  ? "9999+"
                  : myProfile.countOfLikes}
              </Text>
              <Text size="14px" margin="10px 0 0 0" color={grayText}>
                찜한 굿즈
              </Text>
            </Flex>
            <Flex
              is_col
              justify="space-between"
              pointer
              _onClick={() => {
                history.push("/reviews");
              }}
            >
              <Text bold size="22px" margin="5px 0 0 0">
                {myProfile.countOfReceivedReviews > 9999
                  ? "9999+"
                  : myProfile.countOfReceivedReviews}
              </Text>
              <Text size="14px" margin="10px 0 0 0" color={grayText}>
                리뷰
              </Text>
            </Flex>
            <Flex
              is_col
              justify="space-between"
              pointer
              _onClick={() => {
                history.push("/price-proposes");
              }}
            >
              <Text bold size="22px" margin="5px 0 0 0">
                {myProfile.countOfReceievedPriceProposes > 9999
                  ? "9999+"
                  : myProfile.countOfReceievedPriceProposes}
              </Text>
              <Text size="14px" margin="10px 0 0 0" color={grayText}>
                가격제시
              </Text>
            </Flex>
            <Flex
              is_col
              justify="space-between"
              pointer
              _onClick={() => {
                history.push("/notice");
              }}
            >
              <Icon
                width="35px"
                margin="0 auto"
                src="https://goods-duck.com/icon/icon_notice.svg"
              />
              <Text size="14px" color={grayText}>
                공지
              </Text>
            </Flex>
            <Flex
              is_col
              justify="space-between"
              pointer
              _onClick={() => {
                document.location.href = "http://pf.kakao.com/_njxaWs";
              }}
            >
              <Icon
                width="35px"
                margin="0 auto"
                src="https://goods-duck.com/icon/icon_customer.png"
              />
              <Text size="14px" color={grayText}>
                고객센터
              </Text>
            </Flex>
          </BtnGrid>
        </Flex>
      )}
    </>
  );
});

const BtnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-auto-rows: 60px;
  margin-top: 20px;

  @media screen and (min-width: 415px) {
    grid-template-columns: repeat(5, 80px);
  }
`;

export default Btns;
