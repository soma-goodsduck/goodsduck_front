import React from "react";

import styled from "styled-components";
import { Flex, Image } from "../../elements";
import { gray, grayBorder, green } from "../../shared/colors";

import { timeForToday, numberWithCommas } from "../../shared/functions";

import { history } from "../../redux/configureStore";

const PriceProposeRow = ({ item }) => {
  const handleClick = () => {
    history.push(`/item/${item.item.itemId}`);
  };

  return (
    <>
      <PriceRowBox onClick={() => handleClick()}>
        <UserBox>
          <Image
            shape="circle"
            src={
              item.proposer.imageUrl ||
              "https://goods-duck.com/sample_goodsduck.png"
            }
            margin="0 10px 0 0"
            size="50px"
          />
          <InfoBox>
            <Flex>
              <TextBox>
                {item.proposer.nickName}님이 &quot;{item.item.name}&quot; 굿즈에
                가격 제시를 했어요.
                <TextPointBox>
                  [{numberWithCommas(item.proposedPrice)}원]
                </TextPointBox>
              </TextBox>
            </Flex>
            <TextTimeBox>{timeForToday(item.createdAt)}</TextTimeBox>
          </InfoBox>
          <Image
            shape="rectangle"
            src={item.item.imageUrl}
            size="50px"
            borderRadius="5px"
            margin="0 0 0 15px"
          />
        </UserBox>
      </PriceRowBox>
      <Line />
    </>
  );
};

const PriceRowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  cursor: pointer;
`;

const UserBox = styled.div`
  display: flex;
  align-items: flex-start;
`;

const InfoBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextBox = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;

const TextPointBox = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${green};
  margin-left: 10px;
`;

const TextTimeBox = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${gray};
  margin-left: auto;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
`;

export default PriceProposeRow;
