import React, { useState, useEffect } from "react";

import styled from "styled-components";
import styles from "../myProfilePage/myProfilePage.module.css";

import Item from "./otherItemRow";
import HeaderInfo from "../../components/haeder/headerInfo";

import { requestAuthData } from "../../shared/axios";

const OtherItemsPage = (props) => {
  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 2];

  const [items, setItems] = useState([]);
  const [filteringType, setFilteringType] = useState("SELLING");

  const [isSelling, setIsSelling] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const requestItems = async () => {
    const result = await requestAuthData(
      `v1/users/${bcrypt}/items?tradeStatus=${filteringType}`,
    );

    return result;
  };
  const fnEffect = async () => {
    const itemData = await requestItems();
    setItems(itemData);
  };
  useEffect(fnEffect, [filteringType]);

  const clickSelling = () => {
    setFilteringType("SELLING");
    setIsSelling(true);
    setIsBuying(false);
    setIsCompleted(false);
  };

  const clickBuying = () => {
    setFilteringType("BUYING");
    setIsSelling(false);
    setIsBuying(true);
    setIsCompleted(false);
  };

  const clickCompleted = () => {
    setFilteringType("COMPLETE");
    setIsSelling(false);
    setIsBuying(false);
    setIsCompleted(true);
  };

  return (
    <>
      <HeaderInfo text="전체 상품" />
      <ItemListBox>
        <FilteringBox>
          <Filtering
            className={isSelling ? styles.isClicked : styles.isNotClicked}
            onClick={() => {
              clickSelling();
            }}
          >
            판매중
          </Filtering>
          <Filtering
            className={isBuying ? styles.isClicked : styles.isNotClicked}
            onClick={() => {
              clickBuying();
            }}
          >
            구매중
          </Filtering>
          <Filtering
            className={isCompleted ? styles.isClicked : styles.isNotClicked}
            onClick={() => {
              clickCompleted();
            }}
          >
            거래완료
          </Filtering>
        </FilteringBox>
        <Line />
        {items !== null && (
          <div>
            {items.map((item) => (
              <Item item={item} key={item.itemId} />
            ))}
          </div>
        )}
      </ItemListBox>
    </>
  );
};

const ItemListBox = styled.div`
  margin: 70px 20px;
`;

const FilteringBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  margin-top: 20px;
`;

const Filtering = styled.button`
  margin-right: 15px;
`;

const Line = styled.div`
  height: 3px;
  background-color: #dddddd;
  border-radius: 2px;
  margin: 0 auto;
`;

export default OtherItemsPage;
