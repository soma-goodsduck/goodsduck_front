import React from "react";

import styled from "styled-components";
import { Icon, Flex, Text } from "../../elements";
import { grayText } from "../../shared/colors";

import { history } from "../../redux/configureStore";

const Btns = ({ myProfile }) => {
  return (
    <>
      {myProfile && (
        <Flex>
          <BtnGrid>
            <Flex
              is_col
              pointer
              _onClick={() => {
                history.push("/favorites");
              }}
            >
              <Text bold size="22px">
                {myProfile.countOfLikes}
              </Text>
              <Text size="15px" margin="10px 0 0 0" color={grayText}>
                찜
              </Text>
            </Flex>
            <Flex
              is_col
              pointer
              _onClick={() => {
                history.push("/reviews");
              }}
            >
              <Text bold size="22px">
                {myProfile.countOfReceivedReviews}
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
                {myProfile.countOfReceievedPriceProposes}
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
            <a href="http://pf.kakao.com/_njxaWs">
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
            </a>
          </BtnGrid>
        </Flex>
      )}
    </>
  );
};

const BtnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 85px);
  grid-auto-rows: 80px;
  margin-top: 20px;

  @media screen and (min-width: 415px) {
    grid-template-columns: repeat(4, 100px);
  }
`;

export default Btns;
