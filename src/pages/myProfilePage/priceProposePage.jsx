import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { requestAuthData } from "../../shared/axios";

import HeaderInfo from "../../components/haeder/headerInfo";
import PriceProposeRow from "./priceProposeRow";
import { history } from "../../redux/configureStore";

const PriceProposePage = (props) => {
  const [items, setItems] = useState([]);

  const reqPricePropseList = async () => {
    const result = await requestAuthData("v1/users/items/price-propose");
    return result;
  };
  const fnEffect = async () => {
    const getPricePropseList = await reqPricePropseList();
    if (getPricePropseList < 0) {
      history.push("/error");
      return;
    }
    setItems(getPricePropseList);
  };
  useEffect(fnEffect, []);

  return (
    <>
      <HeaderInfo text="가격제시 목록" padding="0 16px" />
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

export default PriceProposePage;
