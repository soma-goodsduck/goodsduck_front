import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Text } from "../../elements";

import { getInfo } from "../../shared/axios";
import { grayText } from "../../shared/colors";
import { formatDate, numberWithCommas } from "../../shared/functions";

const PriceList = ({ id }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const getItems = getInfo(`item/${id}/propose`);
    getItems.then((result) => {
      setItems(result);
      console.log(result);
    });
  }, []);

  return (
    <>
      {items === null && <Text>현재 제시된 가격이 없습니다😢</Text>}
      {items !== null && (
        <div>
          {items.map((item) => (
            <ItemBox key={item.priceProposeId}>
              <Text color={grayText}>{formatDate(item.createdAt)}</Text>
              <Text bold size="18px">
                {numberWithCommas(item.proposedPrice)}원
              </Text>
            </ItemBox>
          ))}
        </div>
      )}
    </>
  );
};

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;

export default PriceList;
