import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "../../shared/axios";

import HeaderInfo from "../../components/haeder/headerInfo";
import PriceProposeRow from "./priceProposeRow";

const PriceProposePage = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = getData("users/items/price-propose");
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
