import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { requestAuthData } from "../../shared/axios";

import HeaderInfo from "../../components/haeder/headerInfo";
import PriceProposeRow from "./priceProposeRow";

const PriceProposePage = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = requestAuthData("v1/users/items/price-propose");
    getItems.then((result) => {
      console.log(result);
      setItems(result);
    });
  }, []);

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
  margin-top: 65px;
  padding: 0 16px;
`;

export default PriceProposePage;
