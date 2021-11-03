import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Text } from "../../elements";
import { grayText } from "../../shared/colors";
import { formatDate, numberWithCommas } from "../../shared/functions";
import { actionCreators as itemActions } from "../../redux/modules/item";

const PriceList = ({ data }) => {
  const dispatch = useDispatch();
  const _priceList = useSelector((state) => state.item.priceProposeList);

  useEffect(() => {
    if (data !== null && data.length !== 0) {
      const sortData = data.reverse();
      if (sortData.length > 5) {
        sortData.slice(0, 5);
      }
      dispatch(itemActions.setPriceProposeList(sortData));
    }
  }, []);

  return (
    <>
      {_priceList.length === 0 && <Text>현재 제시된 가격이 없습니다😢</Text>}
      {_priceList.length !== 0 && (
        <div>
          {_priceList.map((item) => (
            <ItemBox key={item.priceProposeId}>
              <Text color={grayText}>{formatDate(item.createdAt)}</Text>
              <Text bold size="17px">
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
