import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Flex, Text } from "../../elements";
import { grayText } from "../../shared/colors";

const Btns = ({ data }) => {
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
    <>
      {data && (
        <Flex {...styleProps}>
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
  ${(props) =>
    props.isMobile
      ? "grid-template-columns: repeat(2, 85px);"
      : "grid-template-columns: repeat(2, 100px);"};
  grid-auto-rows: 50px;
`;

export default Btns;
