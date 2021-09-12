import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Text } from "../../elements";

import { requestPublicData } from "../../shared/axios";
import { grayText } from "../../shared/colors";
import { formatDate, numberWithCommas } from "../../shared/functions";
import { history } from "../../redux/configureStore";

const PriceList = ({ id }) => {
  const [items, setItems] = useState([]);

  const reqPriceProposeList = async () => {
    const result = await requestPublicData(`v1/items/${id}/price-propose`);
    return result;
  };
  const fnEffect = async () => {
    const getPriceProposeList = await reqPriceProposeList();
    console.log(getPriceProposeList);

    if (getPriceProposeList < 0) {
      history.push("/error");
      return;
    }

    if (getPriceProposeList !== null && getPriceProposeList.length !== 0) {
      const sortData = getPriceProposeList.reverse();
      if (sortData.length > 5) {
        sortData.slice(0, 5);
      }
      setItems(sortData);
    }
  };
  useEffect(fnEffect, []);

  return (
    <>
      {items.length === 0 && <Text>현재 제시된 가격이 없습니다😢</Text>}
      {items.length !== 0 && (
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
