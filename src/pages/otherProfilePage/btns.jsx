import React from "react";

import styled from "styled-components";
import { Flex, Text } from "../../elements";
import { grayText } from "../../shared/colors";

const Btns = ({ data }) => {
  return (
    <>
      {data && (
        <Flex>
          <BtnGrid isMobile>
            <Flex is_col>
              <Text bold size="22px">
                {data.itemCount}
              </Text>
              <Text size="15px" margin="10px 0 0 0" color={grayText}>
                거래상품
              </Text>
            </Flex>
            <Flex is_col>
              <Text bold size="22px">
                {data.reviewCount}
              </Text>
              <Text size="15px" margin="10px 0 0 0" color={grayText}>
                후기
              </Text>
            </Flex>
            {/* <Flex is_col>
              <Text bold size="22px">
                {data.stampCount}/10
              </Text>
              <Text size="15px" margin="10px 0 0 0" color={grayText}>
                보증스탬프
              </Text>
            </Flex> */}
          </BtnGrid>
        </Flex>
      )}
    </>
  );
};

const BtnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 85px);
  grid-auto-rows: 50px;

  @media screen and (min-width: 415px) {
    grid-template-columns: repeat(2, 100px);
  }
`;

export default Btns;
