import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Spinner } from "../../elements";
import PriceProposeRow from "./priceProposeRow";
import HeaderInfo from "../../components/haeder/headerInfo";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const PriceProposePage = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const reqPricePropseList = async () => {
    const result = await requestAuthData("v1/users/items/price-propose");
    return result;
  };
  const fnEffect = async () => {
    setIsLoading(true);

    const getPricePropseList = await reqPricePropseList();
    if (getPricePropseList < 0) {
      history.push("/error");
      return;
    }

    setIsLoading(false);
    setItems(getPricePropseList);
  };
  useEffect(fnEffect, []);

  return (
    <>
      <HeaderInfo text="가격제시 목록" padding="0 16px" />
      {isLoading && <Spinner />}
      {items.length === 0 && (
        <Notice>
          <Text>받은 가격제시가 없습니다!</Text>
        </Notice>
      )}
      {items !== [] && (
        <Box>
          {items.map((item) => (
            <PriceProposeRow key={item.priceProposeId} item={item} />
          ))}
        </Box>
      )}
    </>
  );
};

const Box = styled.div`
  overflow-y: auto;
  height: 95vh;
  margin-top: 40px;
  padding: 0 16px;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const Text = styled.div`
  padding: 7px 0;
  font-weight: 500;
`;

export default PriceProposePage;
